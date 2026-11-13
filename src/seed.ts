import pg from "pg";
import { config } from "./config.js";

const TOTAL = Number(process.argv[2] ?? 1_000_000);

async function main() {
  const client = new pg.Client(config.db);
  await client.connect();

  console.log("clearing old data...");
  await client.query("TRUNCATE orders, products RESTART IDENTITY");

  console.log(`inserting ${TOTAL.toLocaleString()} products...`);
  const started = Date.now();
  await client.query(
    `INSERT INTO products (name, category, price)
     SELECT
       'Product ' || g,
       (ARRAY['books','electronics','toys','garden','sports','music','fashion','home'])[1 + (g % 8)],
       round((random() * 1000)::numeric, 2)
     FROM generate_series(1, $1) AS g`,
    [TOTAL],
  );
  await client.query("ANALYZE products");

  const { rows } = await client.query("SELECT count(*)::int AS n FROM products");
  console.log(`done: ${rows[0].n.toLocaleString()} rows in ${((Date.now() - started) / 1000).toFixed(1)}s`);
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

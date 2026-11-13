-- Runs automatically the first time the Postgres container starts.
-- Note: there is NO index on products.category. That is on purpose.

CREATE TABLE products (
  id        SERIAL PRIMARY KEY,
  name      TEXT           NOT NULL,
  category  TEXT           NOT NULL,
  price     NUMERIC(10, 2) NOT NULL
);

CREATE TABLE orders (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER     NOT NULL REFERENCES products (id),
  quantity    INTEGER     NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

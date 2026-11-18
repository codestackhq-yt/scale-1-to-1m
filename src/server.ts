import express from "express";
import { config } from "./config.js";
import productsRouter from "./routes/product.js";

const app = express();
app.use(express.json());
app.use(productsRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(config.port, () => {
  console.log(`server listening on ${config.port}`);
});

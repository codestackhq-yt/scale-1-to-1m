import { Router } from "express";
import { pool } from "../db";

const router = Router();


  

router.get("/products", async (req, res) => {
  // 1. read page and limit, with defaults
  const page = req.query.page === undefined ? 1 : Number(req.query.page);
  const limit = req.query.limit === undefined ? 20 : Number(req.query.limit);

// 2. validate before anything touches SQL
  if (
    !Number.isInteger(page) || page < 1 ||
    !Number.isInteger(limit) || limit < 1 || limit > 100
  ) {
    return res.status(400).json({ error: "page must be >= 1 and limit must bbetween 1 and 100" });
  }
 // 3. offset = (page - 1) * limit
  const offset = (page - 1) * limit;

  try {
    // 4. parameterized query
    const { rows } = await pool.query(
      "SELECT id, name, category, price FROM products ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );
  // 5. send JSON
    res.json({ page, limit, data:rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;





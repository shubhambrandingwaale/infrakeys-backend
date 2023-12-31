const { pool } = require("../config/db");

async function viewProduct(req, res) {
  try {
    const { userId, productId } = req.body;
    const timestamp = new Date();

    // Insert the view into the database
    const insertQuery =
      "INSERT INTO viewed_products (user_id, product_id, timestamp) VALUES ($1, $2, $3) returning *";
    const values = [userId, productId, timestamp];

    // Execute the SQL query to insert the view
    pool.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting view:", err);
        res.status(500).json({ message: "Error inserting view" });
      } else {
        res.status(200).json({ message: result.rows });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function recentlyViewed(req, res) {
  const userId = parseInt(req.params.userId);
  console.log(userId);

  try {
    const { rows } = await pool.query(
      `SELECT p.*
      FROM viewed_products vp
      JOIN products p ON vp.product_id = p.id
      WHERE vp.user_id = $1
      ORDER BY vp.timestamp DESC
      LIMIT 10;`,
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { viewProduct, recentlyViewed };

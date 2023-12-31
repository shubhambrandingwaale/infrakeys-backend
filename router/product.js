const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../controller/product.controller");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const folderPath = path.join(__dirname, "../assets/products");
    console.log(folderPath);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    callback(null, folderPath);
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploads = multer({ storage });

// routes
router.post("/", uploads.array("file", 5), createProduct);
router.put("/:productId", uploads.array("file", 5), updateProductById);
router.delete("/:productId", deleteProductById);
router.get("/:productId", getProductById);
router.get("/", getProducts);

module.exports = router;

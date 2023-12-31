require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use(express.static("assets/banners"));
app.use(express.static("assets/categories"));
app.use(express.static("assets/sub-categories"));
app.use(express.static("assets/products"));
app.use(express.static("assets/industries"));

app.use("/api/auth", require("./router/auth"));
app.use("/api/users", require("./router/user"));
app.use("/api/products", require("./router/product"));
app.use("/api/dashboard", require("./router/dashboard"));
app.use("/api/product-applications", require("./router/product-application"));
app.use("/api/product-descriptions", require("./router/product-description"));
app.use("/api/product-features", require("./router/product-feature"));
app.use("/api/product-used-by", require("./router/product-used-by"));
app.use("/api/product-queries", require("./router/product-queries"));
app.use("/api/banners", require("./router/banner"));
app.use("/api/categories", require("./router/category"));
app.use("/api/sub-categories", require("./router/sub-category"));
app.use("/api/industries", require("./router/industries"));
app.use("/api", require("./router/recently-view"));

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(PORT, () => {
  console.log(`Server up and running on localhost:${PORT}`);
});

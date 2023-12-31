const express = require("express");
require("dotenv").config();
const cors = require("cors");

const warehouseRoutes = require("./routes/warehouseRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

const PORT = process.env.PORT;

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());

app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventory", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
  console.log("Press CTRL + C to stop server");
});

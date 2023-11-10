const express = require("express");
const {
  getAllWarehouses,
  getWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} = require("../controllers/warehouseController");

const { getInventoryItems } = require("../controllers/inventoryController");

const router = express.Router();

//Base url for this endpoint is /api/warehouses

router.get("/:warehouseId/inventory", getInventoryItems);

router.get("/", getAllWarehouses);
router.get("/:warehouseId", getWarehouse);
router.post("/", createWarehouse);
router.put("/:warehouseId", updateWarehouse);
router.delete("/:warehouseId", deleteWarehouse);

module.exports = router;

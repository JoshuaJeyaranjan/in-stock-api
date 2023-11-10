const express = require("express");
const {
  getAllWarehouses,
  getWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseNames,
} = require("../controllers/warehouseController");

const { getInventoryItems } = require("../controllers/inventoryController");

const router = express.Router();

//Base url for this endpoint is /api/warehouses

router.get("/:warehouseId/inventories", getInventoryItems);

router.get("/", getAllWarehouses);
router.get("/:warehouseId", getWarehouse);
router.post("/", createWarehouse);
router.put("/:warehouseId", updateWarehouse);
router.delete("/:warehouseId", deleteWarehouse);

router.get("/names/distinct", getWarehouseNames);

module.exports = router;

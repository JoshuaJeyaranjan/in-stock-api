const express = require("express");
const {
  getAllInventoryItems,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../controllers/inventoryController");

const router = express.Router();

//Base url for this endpoint is /api/inventory

router.get("/", getAllInventoryItems);
router.get("/:warehouseId", getInventoryItem);
router.post("/", createInventoryItem);
router.put("/:warehouseId", updateInventoryItem);
router.delete("/:warehouseId", deleteInventoryItem);

module.exports = router;

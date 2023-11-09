const express = require("express");
const {
  getAllInventories,

  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../controllers/inventoryController");

const router = express.Router();

//Base url for this endpoint is /api/inventory

router.get("/", getAllInventories);

router.get("/:itemId", getInventoryItem);
router.post("/", createInventoryItem);
router.put("/:warehouseId/:itemId", updateInventoryItem);
router.delete("/:warehouseId/:itemId", deleteInventoryItem);

module.exports = router;

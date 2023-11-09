// Inventory controller functions go here
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig);

exports.getAllInventories = async (_req, res) => {
  try {
    const inventories = await db("inventories")
    .join("warehouses", "inventories.warehouse_id", "warehouses.id")
    .select(
      "inventories.id",
      "inventories.item_name",
      "inventories.description",
      "inventories.category",
      "inventories.status",
      "inventories.quantity",
      "warehouses.warehouse_name"
    );

    if (inventories.length === 0) {
      return res.status(404).json({ message: "No inventories found" });
    }

    return res.status(200).json(inventories);

  } catch (error) {
    console.error("Error fetching inventories:", error);
    return res.status(500).json({ error: err });
  }
};

exports.getInventoryItems = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    const inventoryItems = await db("inventories")
      .select("id", "item_name", "category", "status", "quantity")
      .where({
        warehouse_id: warehouseId,
      });

    if (inventoryItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No inventory items found for this warehouse" });
    }

    return res.status(200).json(inventoryItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

exports.getInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url
};

exports.createInventoryItem = async (req, res) => {
  // return 201 if created
};

exports.updateInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url
};

exports.deleteInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url

  //   return 204 if deleted
};

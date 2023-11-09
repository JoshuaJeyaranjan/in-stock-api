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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
  }
};

exports.getInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url

  try {
    const item = await db("inventories")
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .select(
        "inventories.id",
        "warehouse_name",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      )
      .where({ "inventories.id": itemId })
      .first();

    if (!item) {
      return res.status(400).json({ message: "No item found with that id" });
    } else {
      const responseItem = {
        id: item.id,
        warehouse_name: item.warehouse_name,
        item_name: item.item_name,
        description: item.description,
        category: item.category,
        status: item.status,
        quantity: item.quantity,
      };

      return res.status(200).json(responseItem);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.createInventoryItem = async (req, res) => {
  // return 201 if created
};

exports.updateInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url
  if (req.body.status) {
    if (req.body.status !== "Out of stock" && req.body.status !== "In stock") {
      return res.status(400).send({
        message: "Please ensure the status is in the correct format",
      });
    }
  }
  try {
    const rowsUpdated = await db("inventories")
      .where({ id: itemId })
      .update(req.body); // returns the number of rows affected

    if (rowsUpdated === 0) {
      return res
        .status(400)
        .json({ message: `Inventory item with ID ${itemId} not found` });
    }

    const updatedData = await db("inventories").where({ id: itemId }).first();

    res.json(updatedData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory item with ID ${itemId}: ${error}`,
    });
  }
};

exports.deleteInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url

  //   return 204 if deleted
};

// Inventory controller functions go here
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig);

exports.getAllInventories = async (req, res) => {
  const searchTerm = req.query.s;
  const order = req.query.order_by;
  const sort = req.query.sort_by;

  if (searchTerm) {
    const inventoryResults = await db("inventories")
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .select(
        "warehouse_name",
        "item_name",
        "description",
        "category",
        "status"
      )
      .whereILike("warehouses.warehouse_name", `%${searchTerm}%`)
      .orWhereILike("inventories.item_name", `%${searchTerm}%`)
      .orWhereILike("inventories.category", `%${searchTerm}%`)
      .orderBy(`${order || "id"}`, `${sort || "asc"}`); //defaults to asc
    if (inventoryResults.length === 0) {
      return res.sendStatus(204); //No content
    } else {
      return res.status(200).json(inventoryResults);
    }
  } else {
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
        )
        .orderBy(`${order || "id"}`, `${sort || "asc"}`); //defaults to asc

      if (inventories.length === 0) {
        return res.status(404).json({ message: "No inventories found" });
      }

      return res.status(200).json(inventories);
    } catch (error) {
      console.error("Error fetching inventories:", error);
      return res.status(500).json({ error: error });
    }
  }
};

exports.getInventoryItems = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    const inventoryItems = await db("inventories")
      .select(
        "id",
        "item_name",
        "category",
        "status",
        "quantity",
        "warehouse_id"
      )
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
        "warehouse_id",
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
        warehouse_id: item.warehouse_id,
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
  for (const [key, val] of Object.entries(req.body)) {
    if (!val) {
      return res.status(400).json({
        message:
          "Error creating warehouse in warehouseController:createWarehouse",
        error: `Invalid ${key} input. Found ${val}`,
      });
    }
  }

  try {
    const warehouse = await db("warehouses")
      .where({ id: req.body.warehouse_id })
      .first();

    if (!warehouse) {
      return res
        .status(400)
        .json({ message: "No warehouse found with that ID" });
    }

    const [itemId] = await db("inventories").insert(req.body);

    const item = await db("inventories")
      .select(
        "id",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      )
      .where({ id: itemId })
      .first();

    if (item) {
      return res.status(201).json(item);
    } else {
      return res.status(400).json({
        message: "Error creating item, Invalid input",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error creating item", error: err });
  }
};

exports.updateInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url
  if (req.body.status) {
    if (req.body.status !== "Out of stock" && req.body.status !== "In Stock") {
      return res.status(400).send({
        message: "Please ensure the status is in the correct format",
      });
    }

    if (req.body.status === "Out of stock") {
      req.body.quantity = 0;
    }

    // if (req.body.quantity < 0) {
    //   req.body.status = "Out of stock";
    // }
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

    const updatedData = await db("inventories")
      .where({ id: itemId })
      .select(
        "id",
        "warehouse_id",
        "item_name",
        "description",
        "category",
        "quantity"
      )
      .first();

    res.json(updatedData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory item with ID ${itemId}: ${error}`,
    });
  }
};

exports.deleteInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url

  try {
    //returns number of deleted items
    const deletedItems = await db("inventories").where({ id: itemId }).delete();

    if (deletedItems) {
      return res.sendStatus(204);
    } else {
      return res
        .status(404)
        .json({ message: "Error, no item found with that id" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
  //   return 204 if deleted
};

exports.getCategories = async (_req, res) => {
  try {
    const categories = await db
      .distinct()
      .from("inventories")
      .pluck("category");

    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: "Couldn't fetch categories from table." });
  }
};

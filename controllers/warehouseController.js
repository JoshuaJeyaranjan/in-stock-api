// Warehouse controller functions go here
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig);
const { isValidEmail, isValidPhone } = require('./validation')



exports.getAllWarehouses = async (_req, res) => {
  try {
    const warehouses = await db("warehouses")
      .select('id', 'warehouse_name', 'city', 'country',
        'contact_name', 'contact_position', 'contact_phone', 'contact_email');
    res.status(200).json(warehouses);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

exports.getWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    const warehouse = await db("warehouses")
      .select('id', 'warehouse_name', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email')
      .where({ id: warehouseId }).first();

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    return res.status(200).json(warehouse);
  } catch (error) {
    return res.status(500).json({ error: err });
  }
};

exports.createWarehouse = async (req, res) => {
  //Checks all values are present in request

  for (const [key, val] of Object.entries(req.body)) {
    if (!val) {
      return res.status(400).json({
        message:
          "Error creating warehouse in warehouseController:createWarehouse",
        error: `Invalid ${key} input. Found ${val}`,
      });
    }
  }

  if (!isValidPhone(req.body.contact_phone)) {
    return res.status(400).json({
      message: "Error creating warehouse. Invalid contact number",
      error: `Expected number in format: +1 (919) 797-2875 but got ${req.body.contact_phone}`,
    });
  }

  //Validates contact email
  if (!isValidEmail(req.body.contact_email)) {
    return res.status(400).json({
      message:
        "Error creating warehouse in warehouseController:createWarehouse",
      error: "Invalid email",
    });
  }

  //   All fields valid, create db entry
  //warehouse returns id
  const warehouseId = await db("warehouses").insert(req.body);
  const warehouse = await db("warehouses")
    .select(
      "id",
      "warehouse_name",
      "city",
      "country",
      "contact_name",
      "contact_position",
      "contact_email",
      "contact_phone"
    )
    .where({ id: warehouseId[0] })
    .first();

  if (warehouse) {
    return res.status(201).json(warehouse);
  } else {
    return res.status(500).json({
      error:
        "Error creating warehouse at insert query in warehouseController:createWarehouse",
      warehouse,
    });
  }
};







exports.updateWarehouse = async (req, res) => {
  const { warehouseId } = req.params;

  if (req.body.contact_phone && !isValidPhone(req.body.contact_phone)) {
    return res.status(400).json({ message: "Invalid contact number input" })
  }

  if (req.body.contact_email && !isValidEmail(req.body.contact_email)) {
    return res.status(400).json({ message: "Invalid contact email input" })

  }

  try {
    const warehouse = await db("warehouses")
      .where({ id: warehouseId })
      .update(req.body);

    if (!warehouse) {
      res.status(404).send({ message: "Warehouse not found" });
    }

    const updatedWarehouse = await db("warehouses").where({ id: warehouseId });
    res.status(200).send(updatedWarehouse);
  } catch (error) {
    res.status(400).send({ message: error.sqlMessage });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    const deletedWarehouse = await db("warehouses")
      .where({ id: warehouseId })
      .delete();

    if (deletedWarehouse === 0) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

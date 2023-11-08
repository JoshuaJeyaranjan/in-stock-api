// Warehouse controller functions go here
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig);

exports.getAllWarehouses = async (_req, res) => {
  try {
    const data = await db("warehouses");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

exports.getWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    const warehouse = await db("warehouses").where({ id: warehouseId }).first();

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    return res.status(200).json(warehouse);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
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

  // Validates contact number
  //   number must be in the form of: +1 (919) 797-2875
  //Returns 400 status if any given char in contact_number is not in the valid array of chars
  const validChars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "(",
    ")",
    " ",
    "-",
  ];
  const convertedNumArr = req.body.contact_phone.split("");

  convertedNumArr.forEach((char) => {
    if (!validChars.includes(char)) {
      return res.status(400).json({
        message: "Error creating warehouse. Invalid contact number",
        error: `Expected number in format: +1 (919) 797-2875 but got ${req.body.contact_phone}`,
      });
    }
  });

  //Validates contact email
  const convertedEmailArr = req.body.contact_email.split("");
  if (!convertedEmailArr.includes("@")) {
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
  const { warehouseId } = req.params; //Stores warehouse id in url
};

exports.deleteWarehouse = async (req, res) => {
  const { warehouseId } = req.params; //Stores warehouse id in url

  //return 204 if success
};

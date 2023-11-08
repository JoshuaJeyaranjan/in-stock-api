// Warehouse controller functions go here
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig);

exports.getAllWarehouses = async (_req, res) => {
  try {
    const data = await db("warehouses");
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ error: err });
  }
};

exports.getWarehouse = async (req, res) => {
  const { warehouseId } = req.params; //Stores warehouse id in url
};

exports.createWarehouse = async (req, res) => {
  //return 201 if success
};

exports.updateWarehouse = async (req, res) => {
  const { warehouseId } = req.params; //Stores warehouse id in url
};

exports.deleteWarehouse = async (req, res) => {
  const { warehouseId } = req.params; //Stores warehouse id in url

  //return 204 if success
};

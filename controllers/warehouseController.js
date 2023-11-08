// Warehouse controller functions go here
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig);

exports.getAllWarehouses = async (_req, res) => {};

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

// Warehouse controller functions go here
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig);

exports.getAllWarehouses = async (_req, res) => {};

exports.getWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;
                          //NOT SURE IF IM CALLING THIS DB OR KNEX
    const warehouse = await db('warehouses')
      .where({ id: warehouseId })
      .first();

    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    return res.status(200).json(warehouse);
  } catch (error) {

    return res.status(500).json({ error: 'Internal server error' });
  }
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

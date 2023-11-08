const warehouseData = require("../seed-data/warehouse.js");
const inventoryData = require("../seed-data/inventory.js");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("warehouses").del();
  await knex("warehouses").insert(warehouseData);
  await knex("inventories").del();
  await knex("inventories").insert(inventoryData);
};

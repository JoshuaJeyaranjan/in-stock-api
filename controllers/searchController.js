
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig);


// @Params -> search
// @Type -> search query
// @Returns -> matches to warehouse name, address, contact name, contact info,
// inventory item, category, warehouse name
//
// @Info -> Maybe do a join for all inventory items and warehouses so we can match the
// inventory item warehouse name


exports.search = async (req, res) => {



}

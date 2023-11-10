
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

  const searchTerm = req.query.s

  try {

    const inventoryResults = await db("inventories").join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .select(
        "warehouse_name",
        "item_name",
        "description",
        "category",
        "status",
      )
      .whereILike("warehouses.warehouse_name", `%${searchTerm}%`)
      .orWhereILike("inventories.item_name", `%${searchTerm}%`)
      .orWhereILike("inventories.category", `%${searchTerm}%`)



    const warehouseResults = await db("warehouses")
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
      .whereILike('warehouse_name', `%${searchTerm}%`)
      .orWhereILike('city', `%${searchTerm}%`)
      .orWhereILike('country', `%${searchTerm}%`)
      .orWhereILike('contact_name', `%${searchTerm}%`)
      .orWhereILike('contact_email', `%${searchTerm}%`)
      .orWhereILike('contact_phone', `%${searchTerm}%`)



    if (inventoryResults.length === 0 && warehouseResults.length === 0) {
      return res.sendStatus(204) //No content
    } else {
      return res.status(200).json({ inventoryResults, warehouseResults })

    }

  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err })
  }
}


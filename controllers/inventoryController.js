// Inventory controller functions go here

exports.getAllInventoryItems = async (req, res) => {
  try {
    const { id } = req.params;

    const inventoryItems = await db('inventories')
      .where({ warehouse_id: id });

    if (inventoryItems.length === 0) {
      return res.status(404).json({ message: 'No inventory items found for this warehouse' });
    }

    return res.status(200).json(inventoryItems);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url
};

exports.createInventoryItem = async (req, res) => {
  // return 201 if created
};

exports.updateInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url
};

exports.deleteInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url

  //   return 204 if deleted
};

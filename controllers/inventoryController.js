// Inventory controller functions go here

exports.getAllInventoryItems = async (req, res) => {};

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

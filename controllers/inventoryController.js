// Inventory controller functions go here

export const getAllInventoryItems = async (req, res) => {};

export const getInventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url
};

export const createInventoryItem = async (req, res) => {
  // return 201 if created
};

export const updateIventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url
};

export const deleteIventoryItem = async (req, res) => {
  const { itemId } = req.params; //Stores item id in url

  //   return 204 if deleted
};

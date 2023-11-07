// Warehouse controller functions go here

export const getAllWarehouses = async (req, res) => {};

export const getWarehouse = async (req, res) => {
  const { warehouseId } = req.params; //Stores warehouse id in url
};

export const createWarehouse = async (req, res) => {
  //return 201 if success
};

export const updateWarehouse = async (req, res) => {
  const { warehouseId } = req.params; //Stores warehouse id in url
};

export const deleteWarehouse = async (req, res) => {
  const { warehouseId } = req.params; //Stores warehouse id in url

  //return 204 if success
};

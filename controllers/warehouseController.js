// Warehouse controller functions go here

export const getAllWarehouses = async (req, res) => {};

export const getWarehouse = async (req, res) => {
  const { warehouseId } = req.params; //Stores warehouse id in url
};

export const createWarehouse = async (req, res) => {
  //Checks all values are present in request
  for (const [key, val] of Object.entries(req.body)) {
    if (!val) {
      return res.status(400).json({
        message:
          "Error creating warehouse in warehouseController:createWarehouse",
        error: `Invalid ${key} input. Found ${val}`,
      });
    }
  }

  // Validates contact number
  //   number must be in the form of: +1 (919) 797-2875
  //Returns 400 status if any given char in contact_number is not in the valid array of chars
  const validChars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "(",
    ")",
    " ",
  ];
  const convertedNumArr = req.body.contact_phone.split("");

  convertedNumArr.forEach((char) => {
    if (!validChars.includes(char)) {
      return res.status(400).json({
        message: "Error creating warehouse. Invalid contact number",
        error: `Expected number in format: +1 (919) 797-2875 but got ${req.body.contact_phone}`,
      });
    }
  });

  //Validates contact email
  const convertedEmailArr = req.body.contact_email.split("");
  if (!convertedEmailArr.includes("@")) {
    return res.status(400).json({
      message:
        "Error creating warehouse in warehouseController:createWarehouse",
      error: "Invalid email",
    });
  }

  //   All fields valid, create db entry
  //warehouse returns array of size 1 with all props listed in returning() or []
  const warehouse = await db("warehouses")
    .returning(
      "id",
      "warehouse_name",
      "city",
      "country",
      "contact_name",
      "contact_position",
      "contact_phone",
      "contact_email"
    )
    .insert(req.body);

  if (warehouse.length === 1) {
    return res.status(201).json(warehouse[0]);
  } else {
    return res.status(500).json({
      error:
        "Error creating warehouse at insert query in warehouseController:createWarehouse",
      warehouse,
    });
  }
};

export const updateWarehouse = async (req, res) => {
  const { warehouseId } = req.params; //Stores warehouse id in url
};

export const deleteWarehouse = async (req, res) => {
  const { warehouseId } = req.params; //Stores warehouse id in url

  //return 204 if success
};

API Endpoints:

Root URI: /api

Warehouses: /warehouses

-------------------

GET /warehouses

Example Response
Returns all warehouses with 200 OK if success
[
  {
    "id": 1,
    "warehouse_name": "Manhattan",
    "address": "503 Broadway",
    "city": "New York",
    "country": "USA",
    "contact_name": "Parmin Aujla",
    "contact_position": "Warehouse Manager",
    "contact_phone": "+1 (646) 123-1234",
    "contact_email": "paujla@instock.com"
  },
  {
    "id": 2,
    "warehouse_name": "Washington",
    "address": "33 Pearl Street SW",
    "city": "Washington",
    "country": "USA",
    "contact_name": "Greame Lyon",
    "contact_position": "Warehouse Manager",
    "contact_phone": "+1 (646) 123-1234",
    "contact_email": "glyon@instock.com"
  },
  ...
]

-------------------

PUT /warehouses/:id
Edits existing warehouse
Returns 404 if not found
200 if OK

-------------------

DELETE /warehouses/:id

Deletes existing warehouse

Response:

Returns 404 if not found
204 if succesful

-------------------

POST /warehouses
Creates a new warehouse

Usage:

Request:
{
    "warehouse_name": "Chicago",
    "address": "3218 Guess Rd",
    "city": "Chicago",
    "country": "USA",
    "contact_name": "Jameson Schuppe",
    "contact_position": "Warehouse Manager",
    "contact_phone": "+1 (919) 797-2875",
    "contact_email": "jschuppe@instock.com"
}

Response:

{
    "id": 10,
    "warehouse_name": "Chicago",
    "address": "3218 Guess Rd",
    "city": "Chicago",
    "country": "USA",
    "contact_name": "Jameson Schuppe",
    "contact_position": "Warehouse Manager",
    "contact_phone": "+1 (919) 797-2875",
    "contact_email": "jschuppe@instock.com"
}
400 if not successful
201 if success










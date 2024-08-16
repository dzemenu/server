# Package and Delivery API Documentation

## Overview

This API allows you to manage packages and deliveries. It provides endpoints to create, read, update, and delete packages and deliveries, track their status, and handle delivery operations. The implementation uses Node.js, Express.js for the server, and MongoDB for the database. The API follows a modular structure, separating concerns into models, controllers, and routes.

## Database Models

### Package Model

The `Package` model represents the packages that need to be delivered.

**Fields:**

- `package_id`: `string (GUID)` - Unique identifier for the package.
- `active_delivery_id`: `string (GUID)` - The ID of the current active delivery associated with the package.
- `description`: `string` - Description of the package.
- `weight`: `int (grams)` - Weight of the package.
- `width`: `int (cm)` - Width of the package.
- `height`: `int (cm)` - Height of the package.
- `depth`: `int (cm)` - Depth of the package.
- `from_name`: `string` - Name of the sender.
- `from_address`: `string` - Address of the sender.
- `from_location`: `object` - Location of the sender.
  - `lat`: `number` - Latitude.
  - `lng`: `number` - Longitude.
- `to_name`: `string` - Name of the recipient.
- `to_address`: `string` - Address of the recipient.
- `to_location`: `object` - Location of the recipient.
  - `lat`: `number` - Latitude.
  - `lng`: `number` - Longitude.

### Delivery Model

The `Delivery` model represents the delivery process for a package.

**Fields:**

- `delivery_id`: `string (GUID)` - Unique identifier for the delivery.
- `package_id`: `string (GUID)` - The ID of the package associated with this delivery.
- `pickup_time`: `timestamp` - The scheduled time for picking up the package.
- `start_time`: `timestamp` - The time when the delivery started.
- `end_time`: `timestamp` - The time when the delivery was completed.
- `location`: `object` - The current location of the delivery.
  - `lat`: `number` - Latitude.
  - `lng`: `number` - Longitude.
- `status`: `enum` - The status of the delivery.
  - `open`: The delivery is open and yet to be picked up.
  - `picked-up`: The package has been picked up.
  - `in-transit`: The package is in transit.
  - `delivered`: The package has been delivered.
  - `failed`: The delivery attempt failed.

## Package Routes (`routes/packageRoutes.js`)

These routes define the endpoints for managing packages.

- `POST /packages`: Create a new package.
- `GET /packages`: Retrieve all packages.
- `GET /packages/:package_id`: Retrieve a package by its ID.
- `PUT /packages/:package_id`: Update a package by its ID.
- `DELETE /packages/:package_id`: Delete a package by its ID.

## Delivery Routes (`routes/deliveryRoutes.js`)

These routes define the endpoints for managing deliveries.

- `POST /deliveries`: Create a new delivery.
- `GET /deliveries`: Retrieve all deliveries.
- `GET /deliveries/:delivery_id`: Retrieve a delivery by its ID.
- `PUT /deliveries/:delivery_id/status`: Update the status of a delivery.
- `DELETE /deliveries/:delivery_id`: Delete a delivery by its ID.

## Error Handling

The API will return appropriate HTTP status codes along with error messages when an error occurs. Common error responses include:

- `400 Bad Request`: The request was invalid or cannot be served.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: The server encountered an unexpected condition.

## Conclusion

This documentation provides an overview of the API implementation for managing packages and deliveries. The separation of models, controllers, and routes ensures a clean and modular structure, making the codebase maintainable and scalable.

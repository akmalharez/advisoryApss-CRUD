# API Documentation

## Project Overview
This API allows user and admin login functionality and provides CRUD operations for managing listings in the database.

---

## Setup Instructions

1. Clone the repository and navigate to the project directory.
2. Install dependencies by running:
   ```bash
   npm install
   ```
3. Migrate the database using Sequelize
   ```bash
   npx sequelize db:migrate
   ```    
4. Start the server by running:
   ```bash
   node index.js
   ```
5. Ensure the database is populated with data for the endpoints to work properly.
6. Test the API using [Postman](https://www.postman.com/).

---

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. User Login
- **Method:** POST  
- **URL:** `/userLogin`  
- **Description:** Allows a user to log in.  

#### 2. Admin Login
- **Method:** POST  
- **URL:** `/adminLogin`  
- **Description:** Allows an admin to log in.  

#### 3. Fetch All Listings
- **Method:** GET  
- **URL:** `/listing?latitude=12.9716&longitude=77.5946`  
- **Description:** Fetches all listings in the database based on the provided latitude and longitude.  

#### 4. Add a Listing
- **Method:** POST  
- **URL:** `/listing`  
- **Description:** Adds a new listing to the database.  

#### 5. Update a Listing
- **Method:** PUT  
- **URL:** `/listing/:id`  
- **Description:** Updates a specific listing by its ID.  

#### 6. Delete a Listing
- **Method:** DELETE  
- **URL:** `/listing/:id`  
- **Description:** Deletes a specific listing by its ID.  

---

## Testing the API in Postman

1. Open Postman and create a new collection.
2. Add the above endpoints with their respective HTTP methods.
3. Include the Bearer Token obtain from login in the Authorization tab for request after login.
4. For POST and PUT requests, include the required payload in JSON format in the body section.
5. Ensure the database has relevant data before testing endpoints.
6. Execute the requests and verify the responses for each endpoint.


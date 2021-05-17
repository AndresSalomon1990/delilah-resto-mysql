# Delilah Restó API
This is a REST API made with Express for Delilah Restó. It retrieves data from **MySQL server**.\
As a **client** you can register, check the list of products and make orders.\
The **admins** can recieve those orders and update them. Also they can update the list of products.

## Techs used
1. Logic
    - NodeJs v14.15.4
    - Express v4.17.1
2. Package manager
    - npm v6.14.10
3. Database
    - MySQL

## How to use it

This API was built to run on your own computer in: [http://localhost:3000/api] 

*You can adapt it to run on a server.*

To start using it:

1. Navigate to './api/db/' and create the database structure with the file 'delilah_resto_db_structure.sql'.

2. Start the server with the command:

`node server.js` or `nodemon server.js`

It runs in port 3000.

3. Then you can start making request to the different paths. 

4. **Check the docs in**:

	[http://localhost.com:3000/api/docs] or in the file 'spec.yml'

Recommended steps to test it:
- Create admin
- Create user
- Login as admin
- Create products as admin
- Login as user
- Create order
- Check allowed users paths
- Login as admin
- Check allowed admin paths


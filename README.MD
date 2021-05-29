# NodeJS Application for Users and Employee
## Description
It is simple Users and Employee creation application.

## Features
- You can create, update, delete and get users in User and Employee Table.
- API Documentation available with Swagger.
- Have a data access layer for User and Employee model with get the User table. It helps to avoid the duplications of User model functions.
- Available authentication feature for User and Empoyee endpoints.
- You can change Token Expiry time dynamically in .ENV file
- Established User and Employee belongsTo relation
- Reusable DB connection file available(i.s in Utility) for any relational database

## Installation

Install the devDependencies and start the server with below commands.

```sh
cd DXC_NODEJS
npm install
npm start
```

For development environments

```sh
#Stage
NODE_ENV='development'
API_PORT= 3012

#DB Values
DB_NAME='onpassive_dev_db'
DB_HOST='localhost'
DB_USERNAME='user1'
DB_PASSWORD='password1'

WEB_DOMAIN = 'localhost:3012/'
#JWT Values
JWT_SECRET= 'ONPASSIVE'
JWT_REFRESH_SECRET= 'ONPASSIVERefresh'

EXPIRY_TIME='15m'

#OAuth 
OAuth_CLIENT_ID = ''
OAuth_SECRET = ''
OAuth_REFRESHTOKEN = ''
OAuth_USER = ''
```

## API Documentation

Link: http://localhost:3012/api-docs/

## Note
- Create .ENV file before you use/run the application
- Provide required (i.e DB, JWT, OAUTH and PORT) details before you run the application.

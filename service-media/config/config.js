require('dotenv').config();
const {DB_HOST, DB_USR, DB_PWD, DB_NAME} = process.env;
module.exports = 
{
  "development": {
    "username": DB_USR,
    "password": DB_PWD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": DB_USR,
    "password": DB_PWD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USR,
    "password": DB_PWD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "mysql"
  }
}

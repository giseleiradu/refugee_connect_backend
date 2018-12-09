const pg = require( "pg");
const dotenv = require ("dotenv");

dotenv.config();
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};
const pool = new pg.Pool(config);
pool.on("connect", () => {
  console.log("Database connection successful");
});

const create = () => {
  const coursesTable = `CREATE TABLE IF NOT EXISTS 
  courses(
    id SERIAL PRIMARY KEY,
    courseName VARCHAR(50) NOT NULL,
courseCredits INT NOT NULL,
    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
  )`;


const usersTable = `CREATE TABLE IF NOT EXISTS 
  users(
    id SERIAL PRIMARY KEY,
    names VARCHAR(50) NOT NULL,
    uname VARCHAR(25) NOT NULL UNIQUE,
    role VARCHAR(10) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(50) NULL UNIQUE,
    phone VARCHAR(16) NOT NULL UNIQUE,
    location TEXT NULL,
course INT NULL UNIQUE REFERENCES courses(id),
    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;


const sponsorshipTable = `CREATE TABLE IF NOT EXISTS 
  sponsorship(
    id SERIAL PRIMARY KEY,
    donorname INT NOT NULL REFERENCES users(id),
    receiverNames VARCHAR(50) NOT NULL,
    amount DECIMAL(9,2) NOT NULL,
    createdDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
  pool
    .query(`${usersTable}; ${coursesTable}; ${sponsorshipTable}`)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
  pool.on("remove", () => {
    console.log("Removed");
    process.exit(0);
  });
};
module.exports = { create, pool };
require("make-runnable");

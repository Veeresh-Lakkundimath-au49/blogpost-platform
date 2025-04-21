require("dotenv").config();
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require("sequelize");


// Read the CA file
const caCertPath = path.join(__dirname, 'ca.pem'); // adjust if path is different
const caCert = fs.readFileSync(caCertPath, 'utf8');

// PostgreSQL configuration
const config = {
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST_NAME,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: caCert,
  },
};


const sequelize = new Sequelize({
  dialect: "postgres",
  host: config.host,
  username: config.user,
  password: config.password,
  database: config.database,
  port: config.port,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true, // if the certificate is not self-signed
      ca: config.ssl.ca, // Use the provided certificate chain
    },
  },
  logging: false,
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");
    return sequelize;
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
    process.exit(1); // Exit the app if DB connection fails
  }
}

module.exports = {
  connectToDatabase,
  sequelize,
};

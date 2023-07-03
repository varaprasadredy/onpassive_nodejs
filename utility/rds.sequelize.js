//Import Modules or Paths
import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

const connection = mysql.createConnection(process.env.DATABASE_URL);
//sequelize connection setup for mariadb
const sequelize = new Sequelize({
  dialect: "mysql",
  dialectModule: mysql,
  define: {
    timestamps: false,
  },
  connection: connection,
});

// Sequelize Sync
sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`);
  })
  .catch((error) => {
    console.log("Error is................", error);
  });
//Export sequelize connection
export default sequelize;

import { createConnection } from "mysql";
import dotenv from "dotenv";

dotenv.config();

const database = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

database.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
});


export default database;
import { createConnection } from "mysql";
import dotenv from "dotenv";

dotenv.config();

const datebase = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

datebase.connect((err) => {
  if (err) {
    console.log("Error Connecting to Database");
    return;
  }
  console.log("📶");
});


export default datebase;
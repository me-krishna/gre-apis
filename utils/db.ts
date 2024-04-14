import { createConnection } from "mysql";

const mc = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

mc.connect((err) => {
  if (err) {
    console.log("Error Connecting to Database");
    return;
  }
  console.log("📶");
});


export default mc;
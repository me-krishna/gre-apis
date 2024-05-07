import database from "../../utils/db";

export const loginModel = async (body: any) => {
  const { email, password, type } = body;
  const table = type === 'admin' ? 'mern_admins' : 'mern_students_data';

  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table} WHERE email = ? and password = ? and status = 1`;
    database.query(query, [email, password], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}
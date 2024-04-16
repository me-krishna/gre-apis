import datebase from "../../utils/db";

export const getListofStudents = async ({ limit, offset }: { limit: number, offset: number }) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT user_id ,user_full_name,user_code,user_email,user_mobile,user_active,user_password FROM users WHERE user_role=1 ORDER BY user_id DESC limit ${offset}, ${limit}`;
    datebase.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  })
}

export const GetStudentsTotalCount = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) as total FROM users WHERE user_role=1";
    datebase.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}
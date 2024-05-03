import database from "../../utils/db";

export const getListofStudents = async ({ limit, offset }: { limit: number, offset: number }) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM mern_students_data ORDER BY id DESC limit ${offset}, ${limit}`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  })
}

export const GetStudentsTotalCount = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) as total FROM mern_students_data";
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

/* New Students */

export const addNewStudent = async (student: any) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO mern_students_data SET ?`;
    database.query(query, student, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

export const updateStudent = async (student: any, id: number) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE mern_students_data SET ? WHERE id = ${id}`;
    database.query(query, student, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
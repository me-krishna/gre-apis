import database from "../../utils/db";

export async function createPracticeTestModel(params: any) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO mern_practice_test SET ?`;
    database.query(query, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}
export async function getAllPracticeTestModel(limit: number, offset: number) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM mern_practice_test a inner join mern_exams b on a.exam_pattren_Id = b.id ORDER BY a.id DESC LIMIT ${limit} OFFSET ${offset}`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

export async function getCountOfPratcieTest() {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as total FROM mern_practice_test`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result.length > 0 ? result[0].total : 0);
    })
  })
}

export async function getPracticeTestByIdModel(id: number) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM mern_practice_test WHERE id = ${id}`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  }
  )
}

export async function updatePracticeTestModel(id: number, params: any) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE mern_practice_test SET ? WHERE id = ${id
      }`;
    database.query(query, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}
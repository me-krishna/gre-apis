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

export async function updatePracticeTestModel(uuid: string, params: any) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE mern_practice_test SET ? WHERE uuid = '${uuid}'`;
    database.query(query, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

export async function getAllPracticeTestModel(limit: number, offset: number) {
  return new Promise((resolve, reject) => {
    const query = `SELECT a.*,b.name,b.no_sections,b.total_duration FROM mern_practice_test a inner join mern_exams b on a.exam_pattren_Id = b.id where b.delete_status = 0 and a.isDelete = 0 ORDER BY a.id DESC LIMIT ${limit} OFFSET ${offset}`;
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

export async function getPracticeTestByIdModel(id: string) {
  return new Promise((resolve, reject) => {
    const query = `SELECT a.*,b.uuid FROM mern_practice_test a inner join mern_exam_sections b on a.exam_pattren_Id = b.exam_id  WHERE a.uuid = '${id}' `;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  }
  )
}

export async function updateDeleteStatusModel(uuid: string) {
  const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  return new Promise((resolve, reject) => {
    const query = `UPDATE mern_practice_test SET isDelete = 1 , updated_at='${updated_at}' WHERE uuid = '${uuid}'`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

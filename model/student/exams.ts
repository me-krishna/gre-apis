import database from "../../utils/db";

export const getListOfexamsModel = async (pattren: number, userId: number) => {
  return new Promise((resolve, reject) => {
    const query = `select * from mern_practice_test  where
     exam_pattren_Id = ${pattren} and status = 1 and isDelete = 0`;
    database.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

export const getAttemptedExamModel = async (testId: number, userId: number) => {
  return new Promise((resolve, reject) => {
    const query = `select * from mern_exam_attempted where test_id = ${testId} and userid = ${userId}`;
    database.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}


export const createSectionMain = async (data: any) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO mern_practicetest_sections SET ?`;
    database.query(query, data, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}
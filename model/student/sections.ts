import database from "../../utils/db";

export const getSectionsByExamIdModel = async (exam_id: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM mern_exam_sections WHERE exam_id = ? and status=1`;
    database.query(query, exam_id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}
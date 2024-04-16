import database from "../../utils/db";

export const getTopics = async (topicsid?: number) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM mern_exam_topics`;
    if (topicsid) {
      query += ` WHERE topic_id = ${topicsid}`;
    }
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}
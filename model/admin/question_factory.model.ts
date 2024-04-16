import database from "../../utils/db";

export const getQuestionTypesData = async () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM mern_question_types`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

export const getListOfQuestions = async (limit: number, offset: number) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM questions ORDER BY q_id DESC LIMIT ${limit} OFFSET ${offset}`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

export const getQuestionById = async (q_id: number) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM questions WHERE q_id = ${q_id}`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

export const GetQuestionCount = async () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as total FROM questions`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

export const getQuestionsFullData = async (type: string, q_id: number) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${type.toLowerCase()} WHERE q_id = ${q_id}`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}
import database from "../../utils/db";
import { v4 as uuidv4 } from 'uuid';
let date = new Date();

export const createExamInDb = async (exam: any) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO mern_exams (uuid,name,no_sections,total_duration,created_at,updated_at) values (?,?,?,?,?,?)`;
    database.query(query, exam, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    })
  })
}

export const createExamSections = async (sections: any[], forigrnKey: number) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO mern_exam_sections (uuid,exam_id,section_name,topic_id,no_of_questions,duration,created_at,updated_at) values ?`;
    database.query(query, [
      sections.map((section, idx) => [uuidv4(), forigrnKey, `Section ${idx + 1}`, section.section_topic, section.no_of_questions, section.section_duration, new Date().toISOString().slice(0, 19).replace("T", " "), new Date().toISOString().slice(0, 19).replace("T", " ")])], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      })
  })
}

export const deleteExam = async (exam_id: number) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM mern_exams WHERE id = ?`;
    database.query(query, exam_id, (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows);
    })
  })
}

export const getAllExamsModel = async (limit:number , offset:number) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM mern_exams order by id desc limit ${offset},${limit}`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

export const getExamByIdModel = async (exam_id: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM mern_exams WHERE uuid = ?`;
    database.query(query, exam_id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  })
}

export const getTotalLengthOfExams = async () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as total FROM mern_exams`;
    database.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result.length > 0 ? result[0].total : 0);
    })
  })
}
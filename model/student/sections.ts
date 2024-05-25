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


export const getDetailsSectionDataOfExamDb = async (sectionId: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT
        a.last_question,
        a.section_timer,
        a.last_section,
        a.pratice_test_id,
        b.title as exam_title,
        c.id as exam_id,
        c.no_sections,
        c.total_duration,
        d.uuid as section_id,
        d.section_name,
        d.topic_id,
        d.no_of_questions,
        d.duration
    FROM
        mern_practicetest_sections a
    INNER JOIN mern_practice_test b ON
        a.pratice_test_id = b.uuid
    INNER JOIN mern_exams c ON
        b.exam_pattren_Id = c.id
    INNER JOIN mern_exam_sections d ON
        c.id = d.exam_id
    WHERE
        a.section_id = '${sectionId}'`;
    database.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

export const getExamQuestionDb = async (sessionId: string, sectionsId: string, questionNumber: number) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT
    *
  FROM
    mern_section_questions msq
  inner join mern_questions mq on
    msq.question_id = mq.uuid
  WHERE
    msq.test_section_id = '${sessionId}'
    AND msq.question_section_id = '${sectionsId}'
  ORDER BY
    msq.id DESC
  LIMIT ${questionNumber}`;
    database.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  })
}

export const updateExamSectionDataDB = async (sectionId: string, data: any) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE mern_practicetest_sections SET ? WHERE section_id = '${sectionId}'`;
    database.query(query, data, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  })
}
export const updateExamSectionQuestionDataDB = async (questionId: string, data: any) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE mern_section_questions SET ? WHERE id = '${questionId}'`;
    database.query(query, data, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  })
}
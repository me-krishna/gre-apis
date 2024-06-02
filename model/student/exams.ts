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
    const query = `select section_id,test_status from mern_practicetest_sections where pratice_test_id = '${testId}' and user_id = ${userId}`;
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

export const createSectionQuestios = async (data: any[]) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO mern_section_questions (test_section_id,question_id,question_section_id,question_section_no,correct_ans) VALUES ?`;
    database.query(query, [data], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

export const getInfoAboutExamDb = async (examId: number) => {
  return new Promise((resolve, reject) => {
    const query = `select * from mern_practice_test where id = ${examId}`;
    database.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

export const getListofQuestionInaSection = async (sectionId: string, qsid: string) => {
  return new Promise((resolve, reject) => {
    const query = `select * from mern_section_questions where test_section_id = '${sectionId}' and question_section_id = '${qsid}'`;
    database.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

export const getListOfExamQuestionsDb = async (sectionId: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT
    msq.id as qid,
    msq.*,
    mq.*
  FROM
    mern_section_questions msq
  inner join mern_questions mq on
    msq.question_id = mq.uuid
  WHERE
    msq.test_section_id = '${sectionId}'`;
    database.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })

  })
}

export const updatePracticeTestSessionDb = async (data: any, section_id: string) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE mern_practicetest_sections SET ? WHERE id = ${data.id}`;
    database.query(query, data, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}

export const examWrittenData = async (exam_sessionId: string) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT
    msq.question_section_no,
    msq.question_section_id ,
    msq.marked ,
    msq.correct_ans ,
    msq.attempt_ans ,
    msq.encountered ,
    msq.passage_written ,
    mes.section_name ,
    mes.no_of_questions ,
    mes.duration ,
    mes.topic_id ,
    me.name ,
    me.no_sections ,
    me.total_duration ,
    met.name
  FROM
    mern_section_questions msq
  inner join mern_exam_sections mes on
    msq.question_section_id = mes.uuid
  INNER JOIN mern_exams me on 
    me.id = mes.exam_id
  INNER JOIN mern_exam_topics met 
    on
    met.id = mes.topic_id
  WHERE
    msq.test_section_id = '${exam_sessionId}' 
  ORDER by
    msq.question_section_no ASC`;
    database.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}
import { Request, Response } from "express";
import createResponse from "../../utils/api-resp";
import { createSectionMain, createSectionQuestios, examWrittenData, getAttemptedExamModel, getListOfExamQuestionsDb, getListOfexamsModel, updatePracticeTestSessionDb } from "../../model/student/exams";
import { v4 } from "uuid";
import { getPracticeTestByIdModel } from "../../model/admin/practice_test.model";
import { getQuestionsByPracticeTestId } from "../../model/admin/question_factory.model";
import { updateExamSectionDataDB } from "../../model/student/sections";

export const getListOfexams = async (req: Request, res: Response) => {
  try {
    const { course: examid, userId } = req.body.user
    const examData = await getListOfexamsModel(examid, userId) as any[];
    const attemptedExams = await examData.map(async (exam) => {
      const attemptedExam = await getAttemptedExamModel(exam.uuid, userId) as any[];
      if (attemptedExam.length > 0) {
        exam.attempted = true;
        exam.attemptedData = attemptedExam??[];
      } else {
        exam.attempted = false;
      }
      return exam;
    })
    const [all] = await Promise.all(attemptedExams)
    createResponse(res, {
      status: 200,
      message: "List of exams",
      data: examData,
      metadata: {

      },
    })
  } catch (error) {
    createResponse(res, {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
      metadata: {},
    })
  }
}

export const generateExamSection = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user
    const { praticeExamID } = req.body

    const createSectionPayload = {
      user_id: userId,
      pratice_test_id: praticeExamID,
      section_id: v4(),
    }
    const createSection = await createSectionMain(createSectionPayload) as any;

    const testData = await getPracticeTestByIdModel(praticeExamID) as any[];
    const sectionsDatasPromises = testData.map(async (a) => {
      const sectionsDatas = await getQuestionsByPracticeTestId(a.uuid, a.id) as any[];
      let bcs = sectionsDatas.map((section) => {
        return [createSectionPayload.section_id, section.uuid, section.section_id, a.section_name.split(" ")[1], ""]
      })
      return await createSectionQuestios(bcs);
    });
    await Promise.all(sectionsDatasPromises);
    createResponse(res, {
      status: 200,
      message: "Section created",
      data: {
        section_id: createSectionPayload.section_id,
        question_section_id: testData[0].uuid,
      },
      metadata: {
      },

    })
  } catch (error) {
    createResponse(res, {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
      metadata: {},
    })
  }
}

export const getListExamQuestions = async (req: Request, res: Response) => {
  try {
    const { section_id } = req.body;
    let resp = await getListOfExamQuestionsDb(section_id) as any[];
    let questions = resp.map((question) => (
      {
        ...question,
        question_config: JSON.parse(question.question_config),
        blanks: JSON.parse(question.blanks),
        non_blanks: JSON.parse(question.non_blanks),
      }
    )).sort((a, b) => a.question_section_no - b.question_section_no);

    createResponse(res, {
      status: 200,
      message: 'Success',
      data: questions,
      metadata: {}
    })
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

export const submitTheFinalExam = async (req: Request, res: Response) => {
  try {
    const { section_id } = req.body;
    let updateSectionData = await updateExamSectionDataDB(section_id, {
      test_status: 1
    }) as any
    createResponse(res, {
      status: 200,
      message: 'Success',
      data: [],
      metadata: {}
    })
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

export const getSummaryOfPeroformance = async (req: Request, res: Response) => {
  try {
    const { section_id } = req.body;
    const scores = await getScors(section_id);
    createResponse(res, {
      status: 200,
      message: 'Success',
      data: scores,
      metadata: {}
    })
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

const getScors = async (section_id: string) => {
  let resp = await examWrittenData(section_id) as any[];
  let object_devide = resp.filter((item: any) => item.topic_id !== 1).reduce((acc: any, current: any) => {
    if (!acc[current.question_section_id]) {
      acc[current.question_section_id] = {};
    }
    acc[current.question_section_id] = {
      ...acc[current.question_section_id],
      sectionNo: current.question_section_no,
      sectionName: current.section_name,
      topicName: current.name,
      totalQuestions: current.no_of_questions,
      totalAttempted: (acc[current.question_section_id].totalAttempted ? acc[current.question_section_id].totalAttempted : 0) + (current.attempt_ans !== null && current.attempt_ans !== '' ? 1 : 0),
      totalUnAttempted: (acc[current.question_section_id].totalUnAttempted ? acc[current.question_section_id].totalUnAttempted : 0) + (current.attempt_ans === null || current.attempt_ans === '' ? 1 : 0),
      totalCorrectly: (acc[current.question_section_id].totalCorrectly ? acc[current.question_section_id].totalCorrectly : 0) + (
        current.attempt_ans === current.correct_ans ? 1 : 0
      ),
      totalInCorrectly: (acc[current.question_section_id].totalInCorrectly ? acc[current.question_section_id].totalInCorrectly : 0) + (
        current.attempt_ans !== null && current.attempt_ans !== current.correct_ans ? 1 : 0
      ),

    };
    return acc;
  }, {});
  return object_devide;
}
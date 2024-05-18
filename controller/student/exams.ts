import { Request, Response } from "express";
import createResponse from "../../utils/api-resp";
import { createSectionMain, getAttemptedExamModel, getListOfexamsModel } from "../../model/student/exams";
import { v4 } from "uuid";
import { getPracticeTestByIdModel } from "../../model/admin/practice_test.model";

export const getListOfexams = async (req: Request, res: Response) => {
  try {
    const { course: examid, userId } = req.body.user
    const examData = await getListOfexamsModel(examid, userId) as any[];
    const attemptedExams = await examData.map(async (exam) => {
      const attemptedExam = await getAttemptedExamModel(exam.id, userId) as any[];
      if (attemptedExam.length > 0) {
        exam.attempted = true;
        exam.attemptedData = attemptedExam[0];
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
      user_id : userId,
      pratice_test_id : praticeExamID,
      section_id: v4(),
    }

    const getQuestion = await getPracticeTestByIdModel(praticeExamID) as any[];

    const createSection = await createSectionMain(createSectionPayload) as any;
createResponse(res, {
      status: 200,
      message: "Section created",
      data: {
        section_id: createSectionPayload.section_id,
        questions: getQuestion
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
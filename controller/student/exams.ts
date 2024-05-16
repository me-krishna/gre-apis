import { create } from "domain";
import { Request, Response } from "express";
import createResponse from "../../utils/api-resp";
import { getAttemptedExamModel, getListOfexamsModel } from "../../model/student/exams";

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
    console.log(error)
    createResponse(res, {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
      metadata: {},
    })
  }
}
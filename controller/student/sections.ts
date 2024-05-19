import { Request, Response } from "express";
import createResponse from "../../utils/api-resp";
import { getSectionsByExamIdValidation } from "../../validation/admin/exams.validation";
import { getSectionsByExamIdModel } from "../../model/admin/exams.model";
import { getListofQuestionInaSection } from "../../model/student/exams";
import { getDetailsSectionDataOfExamDb } from "../../model/student/sections";

export const getSectionsByExamIDStudent = async (req: Request, res: Response) => {
  try {
    const sections = await getSectionsByExamIdModel(req?.body?.user.course) as any[];

    createResponse(res, {
      status: 200,
      message: 'Success',
      data: sections,
      metadata: {}
    })
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

export const getQuestionSectionData = async (req: Request, res: Response) => {
  try {
    const sid = req.body.section_id;
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

export const getQuestionsDataBySections = async (req: Request, res: Response) => {
  try {
    const {
      section_id,
      sid
    } = req.body;

    let resp = await getListofQuestionInaSection(section_id, sid) as any[];

    createResponse(res, {
      status: 200,
      message: 'Success',
      data: resp,
      metadata: {}
    })

  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

export const getExamSectionFullDetails = async (req: Request, res: Response) => {
  try {
    const { section_id } = req.body;
    let resp = await getDetailsSectionDataOfExamDb(section_id) as any[];
    const responseObj = {
      testDetails: {
        last_question: resp[0].last_question,
        section_timer: resp[0].section_timer,
        pratice_test_id: resp[0].pratice_test_id,
        exam_title: resp[0].exam_title,
        exam_id: resp[0].exam_id,
        no_sections: resp[0].no_sections,
        total_duration: resp[0].total_duration,
      },
      testSections: resp.map((section) => {
        return {
          section_id: section.section_id,
          section_name: section.section_name,
          topic_id: section.topic_id,
          no_of_questions: section.no_of_questions,
          duration: section.duration
        }
      })
    }
    createResponse(res, {
      status: 200,
      message: 'Success',
      data: responseObj,
      metadata: {}
    })
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

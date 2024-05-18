import { Request, Response } from "express";
import createResponse from "../../utils/api-resp";
import { getSectionsByExamIdValidation } from "../../validation/admin/exams.validation";
import { getSectionsByExamIdModel } from "../../model/admin/exams.model";

export const getSectionsByExamIDStudent = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
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


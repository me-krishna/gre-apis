import { Request, Response } from "express";
import { createPracticeTestModel, getAllPracticeTestModel, getCountOfPratcieTest } from "../../model/admin/practice_test.model";
import createResponse from "../../utils/api-resp";
import { createPracticeTestValidation, getTestValidation } from "../../validation/admin/practice_test.validation";
import { v4 } from "uuid";

export const createPracticeTest = async (req: Request, res: Response) => {
  const { error, value } = createPracticeTestValidation(req.body);
  if (error) {
    return createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }
  try {
    const payload = {
      uuid: v4(),
      title: value.testTitle,
      exam_pattren_Id: value.pattren,
      status: value.status,
    }
    const rows = await createPracticeTestModel(payload) as any;
    createResponse(res, { status: 200, message: 'Success', data: rows, metadata: {} });
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

export const getAllTests = async (req: Request, res: Response) => {
  const { error, value } = getTestValidation(req.query);
  if (error) {
    return createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }
  try {
    const { page, limit } = value;
    const offset = (page - 1) * limit;
    const totalCount = await getCountOfPratcieTest() as number;
    const rows = await getAllPracticeTestModel(limit, offset) as any[];
    createResponse(res, {
      status: 200, message: 'Success', data: rows, metadata: {
        pagination: {
          total_pages: Math.ceil(totalCount / limit),
          current_page: page,
          total_records: totalCount,
          current_page_records: rows.length,
          limit
        }
      }
    })
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}
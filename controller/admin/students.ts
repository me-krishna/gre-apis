import { Request, Response } from "express";
import createResponse from "../../utils/api-resp"
import { getListofStudents, GetStudentsTotalCount } from "../../model/admin/students.model";
import { GetStudentsValidation } from "../../validation/admin/students";

export const GetStudents = async (req: Request, res: Response) => {
  const { value, error, warning } = GetStudentsValidation(req.query);

  console.log(value, error);
  if (!error) {
    try {
      const { page, limit } = value;
      const offset = (page - 1) * limit;

      const totalStudents = await GetStudentsTotalCount() as any[];
      const listOfStidents = await getListofStudents({ limit, offset }) as any[];

      createResponse(res, {
        status: 200, message: 'Success', data: listOfStidents, metadata: {
          pagination: {
            total_pages: Math.ceil(totalStudents[0].total / limit),
            current_page: page,
            total_records: totalStudents[0].total,
            current_page_records: listOfStidents.length,
            limit
          }
        }
      });
    } catch (error) {
      console.log(error);
      createResponse(res, { status: 500, message: 'Internal Server Error', data: null, metadata: {} });
    }
  } else {
    createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }
}
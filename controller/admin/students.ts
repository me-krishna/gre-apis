import e, { Request, Response } from "express";
import createResponse from "../../utils/api-resp"
import { addNewStudent, getListofStudents, GetStudentsTotalCount, updateStudent } from "../../model/admin/students.model";
import { GetStudentsValidation } from "../../validation/admin/students";
import { generate } from "generate-password";
export const GetStudents = async (req: Request, res: Response) => {
  const { value, error, warning } = GetStudentsValidation(req.query);
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
      createResponse(res, { status: 500, message: 'Internal Server Error', data: null, metadata: {} });
    }
  } else {
    createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }
}

export const AddNewStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const payload = {
      name: student.name,
      email: student.email,
      mobile: student.mobile,
      course: student.course,
      password: generate({
        length: 13,
        numbers: true,
        symbols: true,
        excludeSimilarCharacters: true,
        strict: true
      })
    }
    const result = await addNewStudent(payload);
    createResponse(res, { status: 200, message: 'Success', data: result, metadata: {} });
  } catch (error) {
    createResponse(res, { status: 500, message: 'Internal Server Error', data: null, metadata: {} });
  }
}

export const UpdateStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const studentId = Number(req.params.student_id);
    const result = await updateStudent(student, studentId);
    createResponse(res, { status: 200, message: 'Success', data: result, metadata: {} });
  } catch (error) {
    createResponse(res, { status: 500, message: 'Internal Server Error', data: null, metadata: {} });
  }
}
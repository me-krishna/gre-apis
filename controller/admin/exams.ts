import { Request, Response } from "express";
import { createExamValidation, getExamValidation } from "../../validation/admin/exams.validation";
import { v4 as uuidv4 } from 'uuid';
import { createExamInDb, createExamSections, deleteExam, getAllExamsModel, getExamByIdModel, getTotalLengthOfExams } from "../../model/admin/exams.model";
import createResponse from "../../utils/api-resp";

export const createExam = async (req: Request, res: Response) => {
  const { error } = createExamValidation(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
      data: error,
      metadata: {}
    })
  }
  try {
    const date = new Date();
    const forigrnKey = await createExamInDb([
      uuidv4(),
      req.body.name,
      req.body.no_sections,
      req.body.sections.reduce((acc: number, curr: any) => acc + parseInt(curr.section_duration), 0),
      date.toISOString().slice(0, 19).replace('T', ' '),
      date.toISOString().slice(0, 19).replace('T', ' ')
    ]);
    if (!forigrnKey) throw 'Error while creating exam';

    const sessionsCreated = await createExamSections(req.body.sections, forigrnKey as number);

    if (!sessionsCreated) {
      const rows = await (deleteExam(forigrnKey as number)) as number;
      if (rows > 0) {
        throw 'Error while sessions creation'
      }
    }
    res.status(201).json({
      status: 201,
      message: 'Success',
      data: null,
      metadata: {}
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
      metadata: {}
    })
  }
}

export const getAllExams = async (req: Request, res: Response) => {
  const { error, value } = getExamValidation(req.query);
  if (error) {
    return createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }
  try {
    const { page, limit } = value;
    const offset = (page - 1) * limit;
    const totalCount = await getTotalLengthOfExams() as number;
    const exams = await getAllExamsModel(limit, offset) as any[];
    createResponse(res, {
      status: 200,
      message: 'Success',
      data: exams,
      metadata: {
        pagination: {
          total_pages: Math.ceil(totalCount / limit),
          current_page: page,
          total_records: totalCount,
          current_page_records: exams.length,
          limit
        }
      }
    })
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

export const getExamById = async (req: Request, res: Response) => {
  try {
    const exam = await getExamByIdModel(req.params.exam_id);
    res.status(200).json({
      status: 200,
      message: 'Success',
      data: exam,
      metadata: {}
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
      metadata: {}
    })
  }
}
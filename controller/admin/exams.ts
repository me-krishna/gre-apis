import { Request, Response } from "express";
import { createExamValidation, deleteTheExamValidation, getExamValidation, getSectionsByExamIdValidation, updateExamSectionsValidation, updateExamValidation } from "../../validation/admin/exams.validation";
import { v4 as uuidv4 } from 'uuid';
import { createExamInDb, createExamSections, deleteExam, getAllExamsModel, getExamByIdModel, getSectionsByExamIdModel, getTotalLengthOfExams, UpdateDeleteStatus, updateExamInDb, updateSectionByuuidDb } from "../../model/admin/exams.model";

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

export const updateExam = async (req: Request, res: Response) => {
  const { error, value } = updateExamValidation({ ...req.body, ...req.params });
  if (error) {
    return createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }

  try {
    const date = new Date();
    const affectedRows = await updateExamInDb([
      req.body.name,
      req.body.duration,
      date.toISOString().slice(0, 19).replace('T', ' '),
      req.params.exam_id as string
    ]) as number;
    if (affectedRows < 1) {
      return createResponse(res, { status: 404, message: 'Exam not found', data: null, metadata: {} });
    }
    return createResponse(res, { status: 204, message: 'Success', data: null, metadata: {} });
  } catch (error) {
    return createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
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

export const deleteTheExam = async (req: Request, res: Response) => {
  const { error, value } = deleteTheExamValidation(req.params);
  if (error) {
    return createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }

  try {
    const rows = await UpdateDeleteStatus(value.exam_id) as number;
    if (rows > 0) {
      return createResponse(res, { status: 200, message: 'Success', data: null, metadata: {} });
    }
    createResponse(res, { status: 404, message: 'Exam not found', data: null, metadata: {} });
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }

}

export const getSectionsByExamID = async (req: Request, res: Response) => {
  const { error, value } = getSectionsByExamIdValidation(req.params);
  if (error) {
    return createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }
  try {
    const sections = await getSectionsByExamIdModel(value.exam_id) as any[];
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

export const updateSectionIdByUuid = async (req: Request, res: Response) => {
  const { error } = updateExamSectionsValidation({ ...req.body, ...req.params });
  if (error) {
    return createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }
  try {
    const date = new Date();
    const affectedRows = await updateExamInDb([
      req.body.section_topic,
      req.body.section_duration,
      req.body.no_of_questions,
      req.params.section_id
    ]) as number;
    if (affectedRows < 1) {
      return createResponse(res, { status: 404, message: 'Section not found', data: null, metadata: {} });
    }
    return createResponse(res, { status: 204, message: 'Success', data: null, metadata: {} });
  } catch (error) {
    return createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

export const updateMultipleSectins = async (req: Request, res: Response) => {
  const { error } = updateExamSectionsValidation(req.body);
  if (error) {
    return createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }
  try {
    const date = new Date();
    const a = req.body.map(async (section: any) => {
      const affectedrows = await updateSectionByuuidDb([
        section.section_topic,
        section.no_of_questions,
        section.section_duration,
        date.toISOString().slice(0, 19).replace('T', ' '),
        section.uuid
      ]) as number;
      return affectedrows;
    })
    let b = await Promise.all(a);
    let totalAffectedRows = b.reduce((acc, curr) => acc + curr, 0);
    if (totalAffectedRows < 1) {
      return createResponse(res, { status: 404, message: 'Sections not found', data: null, metadata: {} });
    }
    return createResponse(res, { status: 204, message: 'Success', data: null, metadata: {} });
  } catch (error) {
    return createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}
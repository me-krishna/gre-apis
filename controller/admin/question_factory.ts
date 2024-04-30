import { Request, Response } from "express";
import createResponse from "../../utils/api-resp";
import { GetQuestionCount, getQuestionTypesData, getListOfQuestions, getQuestionById, getQuestionsFullData } from '../../model/admin/question_factory.model';
import { GetQuestionsFullDataValidation, GetQuestionsValidation, GetQuestionTypesValidation } from "../../validation/admin/question-factory.validation";

export const getQuestionTypes = async (req: Request, res: Response) => {
  const { error, value } = GetQuestionTypesValidation(req.query);
  if (error) {
    return createResponse(res, {
      status: 400,
      message: error.message,
      data: error,
      metadata: {}
    })
  }
  try {
    const listOfQuestionTypes = await getQuestionTypesData(value.type) as any[];
    createResponse(res, {
      status: 200,
      message: 'Success',
      data: listOfQuestionTypes,
      metadata: {}
    })
  } catch (error) {
    createResponse(res, {
      status: 500,
      message: 'Internal Server Error',
      data: null,
      metadata: {}
    })
  }
}

export const GetQuestionsList = async (req: Request, res: Response) => {
  const { value, error, warning } = GetQuestionsValidation(req.query);
  if (!error) {
    try {
      const { page, limit } = value;
      const offset = (page - 1) * limit;
      const totalQuestions = await GetQuestionCount() as any[];
      const listOfQuestions = await getListOfQuestions(limit, offset) as any[];

      createResponse(res, {
        status: 200,
        message: 'Success',
        data: listOfQuestions,
        metadata: {
          pagination: {
            total_pages: Math.ceil(totalQuestions[0].total / limit),
            current_page: page,
            total_records: totalQuestions[0].total,
            current_page_records: listOfQuestions.length,
            limit
          }
        }
      });
    } catch (error) {
      createResponse(res, {
        status: 500,
        message: 'Internal Server Error',
        data: null,
        metadata: {}
      })
    }
  } else {
    createResponse(res, {
      status: 400,
      message: error.message,
      data: error,
      metadata: {}
    })
  }
}

export const GetQuestionById = async (req: Request, res: Response) => {
  try {
    const q_id = req.params.q_id;
    const question = await getQuestionById(parseInt(q_id)) as any[];
    createResponse(res, {
      status: 200,
      message: 'Success',
      data: question,
      metadata: {}
    })
  } catch (error) {
    createResponse(res, {
      status: 500,
      message: 'Internal Server Error',
      data: null,
      metadata: {}
    })
  }
}

export const GetQuestionsFullData = async (req: Request, res: Response) => {
  const { error } = GetQuestionsFullDataValidation(req.query);
  if (error) {
    return createResponse(res, {
      status: 400,
      message: error.message,
      data: error,
      metadata: {}
    })
  }
  try {
    const { type, q_id } = req.query;
    const question = await getQuestionsFullData(type as string, parseInt(q_id as string)) as any[];
    createResponse(res, {
      status: 200,
      message: 'Success',
      data: question,
      metadata: {}
    })
  } catch (error) {
    createResponse(res, {
      status: 500,
      message: 'Internal Server Error',
      data: null,
      metadata: {}
    })
  }
}
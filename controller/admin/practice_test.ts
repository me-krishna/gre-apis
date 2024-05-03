import { Request, Response } from "express";
import { createPracticeTestModel, getAllPracticeTestModel, getCountOfPratcieTest, getPracticeTestByIdModel, updateDeleteStatusModel, updatePracticeTestModel } from "../../model/admin/practice_test.model";
import createResponse from "../../utils/api-resp";
import { createPracticeTestValidation, getTestValidation, updatePracticeTestValidation } from "../../validation/admin/practice_test.validation";
import { v4 } from "uuid";
import { createQuestions, getQuestionsByPracticeTestId, updateQuestions } from "../../model/admin/question_factory.model";

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
    if (rows.affectedRows === 1) {
      const lastInsertedId = rows.insertId;
      let successMsgs: any[] = [];
      value.sections.map((section: any) => {
        section?.questions?.map((question: any) => {
          const questionPayload = {
            uuid: v4(),
            test_id: lastInsertedId,
            section_id: question.section_uuid,
            question: question.question,
            passage: question.passage,
            explination: question.explination,
            question_config: JSON.stringify(question.questions_config),
            blanks: JSON.stringify(question.blanks),
            non_blanks: JSON.stringify(question.nonBlanks),
            status: 2
          }
          createQuestions(questionPayload).then(
            (res: any) => {
              successMsgs.push(res)
            })
        })

      })
      createResponse(res, { status: 201, message: 'Success', data: null, metadata: {} });
    } else {
      createResponse(res, { status: 500, message: 'Internal Server Error', data: null, metadata: {} });
    }
    // createResponse(res, { status: 200, message: 'Success', data: rows, metadata: {} });
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

export const updatePracticeTest = async (req: Request, res: Response) => {
  const { error, value } = updatePracticeTestValidation({ ...req.body, testId: req.params.testId });
  if (error) {
    return createResponse(res, { status: 400, message: error.message, data: error, metadata: {} });
  }
  try {
    const payload = {
      title: value.testTitle,
      exam_pattren_Id: value.pattren,
      status: value.status,
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " ")
    }
    const rows = await updatePracticeTestModel(value.testId, payload) as any;
    if (rows.affectedRows === 1) {
      let successMsgs: any[] = [];
      await Promise.all(value.sections.map(async (section: any) => {
        if (section?.questions) {
          await Promise.all(section.questions.map(async (question: any) => {
            const questionPayload = {
              test_id: question.test_id,
              section_id: question.section_uuid,
              question: question.question,
              passage: question.passage,
              explination: question.explination,
              question_config: JSON.stringify(question.questions_config),
              blanks: JSON.stringify(question.blanks),
              non_blanks: JSON.stringify(question.nonBlanks),
              updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
              status: value.status,
            }
            await updateQuestions(questionPayload, question.id).then(
              (res: any) => {
                successMsgs.push(res)
              })
          }))
        }
      }))
      createResponse(res, { status: 201, message: 'Success', data: null, metadata: {} });
    } else {
      createResponse(res, { status: 500, message: 'Internal Server Error', data: null, metadata: {} });
    }
    // createResponse(res, { status: 200, message: 'Success', data: rows, metadata: {} });
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

export const getTestByUuid = async (req: Request, res: Response) => {
  try {
    const uuid = req.body.uuid;
    const testData = await getPracticeTestByIdModel(uuid) as any[];
    const sectionsDatasPromises = testData.map(async (a) => {
      const sectionsDatas = await getQuestionsByPracticeTestId(a.uuid, a.id) as any[];
      return {
        questions: sectionsDatas.map((res) => ({
          ...res,
          section_uuid: res.section_id,
          questions_config: JSON.parse(res.question_config),
          blanks: JSON.parse(res.blanks),
          nonBlanks: JSON.parse(res.non_blanks),
        }))
      };
    });
    const sectionsData = await Promise.all(sectionsDatasPromises);
    const respObject = {
      pattren: testData[0]?.exam_pattren_Id,
      testTitle: testData[0]?.title,
      status: testData[0]?.status,
      sections: sectionsData,
    }
    createResponse(res, { status: 200, message: 'Success', data: respObject, metadata: {} });
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}

export const updatePracticeTestDeleteStatus = async (req: Request, res: Response) => {
  try {
    const uuid = req.body.uuid;
    const rows = await updateDeleteStatusModel(uuid) as any;
    if (rows.affectedRows === 1) {
      createResponse(res, { status: 200, message: 'Success', data: null, metadata: {} });
    } else {
      createResponse(res, { status: 500, message: 'Internal Server Error', data: null, metadata: {} });
    }
  } catch (error) {
    createResponse(res, { status: 500, message: error instanceof Error ? error.message : "Internal Server Error", data: null, metadata: {} });
  }
}
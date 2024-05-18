import Joi from "joi"

export const createExamValidation = (query: any) => {
  const schema = Joi.object().keys({
    user : Joi.optional(),
    name: Joi.string().required(),
    no_sections: Joi.number().required(),
    sections: Joi.array().items(Joi.object().keys({
      section_topic: Joi.number().required(),
      section_duration: Joi.number().required(),
      no_of_questions: Joi.number().required()
    }))
  });

  return schema.validate(query, { abortEarly: false });
}
export const updateExamValidation = (query: any) => {
  const schema = Joi.object().keys({
    user : Joi.optional(),
    exam_id: Joi.string().required(),
    name: Joi.string().required(),
    duration: Joi.number().required(),
  });

  return schema.validate(query, { abortEarly: false });
}

export const getExamValidation = (query: any) => {
  const schema = Joi.object().keys({
    user : Joi.optional(),
    page: Joi.number().required(),
    limit: Joi.number().required()
  });
  return schema.validate(query, { abortEarly: false });
}

export const deleteTheExamValidation = (query: any) => {
  const schema = Joi.object().keys({
    user : Joi.optional(),
    exam_id: Joi.string().required()
  });
  return schema.validate(query, { abortEarly: false });
}

export const getSectionsByExamIdValidation = (params: any) => {
  const schema = Joi.object().keys({
    user : Joi.optional(),
    exam_id: Joi.string().required()
  });
  return schema.validate(params, { abortEarly: false });
}

export const updateExamSectionsValidation = (query: any) => {
  const schema = Joi.array().items(Joi.object().keys({
    uuid: Joi.string().required(),
    section_topic: Joi.number().required(),
    section_duration: Joi.number().required(),
    no_of_questions: Joi.number().required()
  }))

  return schema.validate(query, { abortEarly: false });
}
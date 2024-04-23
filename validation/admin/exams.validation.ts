import { Request } from "express";
import Joi from "joi"

export const createExamValidation = (query: any) => {
  const schema = Joi.object().keys({
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

export const getExamValidation = (query: any) => {
  const schema = Joi.object().keys({
    page: Joi.number().required(),
    limit: Joi.number().required()
  });


  return schema.validate(query, { abortEarly: false });
}
import Joi from 'joi';

export const GetQuestionsValidation = (quary: any) => {
  const schema = Joi.object().keys({
    user : Joi.optional(),
    page: Joi.number().required(),
    limit: Joi.number().required()
  });
  return schema.validate(quary, { abortEarly: false });
}

export const GetQuestionsFullDataValidation = (quary: any) => {
  const schema = Joi.object().keys({
    user : Joi.optional(),
    type: Joi.string().required(),
    q_id: Joi.string().required()
  });
  return schema.validate(quary, { abortEarly: false });
}

export const GetQuestionTypesValidation = (quary: any) => {
  const schema = Joi.object().keys({
    user : Joi.optional(),
    type: Joi.string(
    ).required().valid('all', 'active', 'inactive')
  });
  return schema.validate(quary, { abortEarly: false });
}
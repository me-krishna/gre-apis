import Joi from 'joi';

export function createPracticeTestValidation(params: any) {
  const schema = Joi.object().keys({
    testTitle: Joi.string().required(),
    pattren: Joi.number().required(),
    status: Joi.number().required()
  });
  return schema.validate(params, { abortEarly: false });

}

export const getTestValidation = (query: any) => {
  const schema = Joi.object().keys({
    page: Joi.number().required(),
    limit: Joi.number().required()
  });
  return schema.validate(query, { abortEarly: false });
}
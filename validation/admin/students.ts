import Joi from 'joi';

export const GetStudentsValidation = (query: any) => {
  const schema = Joi.object().keys({
    user : Joi.optional(),
    page: Joi.number().required(),
    limit: Joi.number().required()
  });


  return schema.validate(query, { abortEarly: false });

}

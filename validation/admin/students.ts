import Joi from 'joi';

export const GetStudentsValidation = (quary: any) => {
  const schema = Joi.object().keys({
    page: Joi.number().required(),
    limit: Joi.number().required()
  });


  return schema.validate(quary, { abortEarly: false });

}

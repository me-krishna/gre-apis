import Joi from 'joi';
export const loginValidatin = (body: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required().error(new Error("Email is required and must be a valid email address")),
    password: Joi.string().required().error(new Error("Password is required")),
    type: Joi.string().valid('admin', 'student').required().error(new Error("Type is required and must be either 'admin' or 'student'"))
  });
  return schema.validate(body, { abortEarly: false });
}
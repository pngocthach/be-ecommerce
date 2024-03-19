import Joi from 'joi'

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required()
})

const updateUserSchema = Joi.object({
  userId: Joi.string().required().trim(),
  email: Joi.string().email().lowercase().trim(),
  password: Joi.string().min(2).trim()
})

export {
  authSchema,
  updateUserSchema
}
import Joi from 'joi'

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required()
})

const updateUserSchema = Joi.object({
  userId: Joi.string().required(),
  email: Joi.string().email().lowercase(),
  password: Joi.string().min(2)
})

export {
  authSchema,
  updateUserSchema
}
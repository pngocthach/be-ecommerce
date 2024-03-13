import AuthService from '../services/auth.service.js'

export default {
  login: async (req, res, next) => {
    try {
      const tokens = await AuthService.login(req.body)
      res.send(tokens)
    } catch (err) {
      if (err.isJoi) err.status = 400
      next(err)
    }
  },

  register: async (req, res, next) => {
    try {
      const tokens = await AuthService.register(req.body)
      res.send(tokens)
    } catch (err) {
      if (err.isJoi) err.status = 422
      next(err)
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const tokens = await AuthService.refreshToken(refreshToken)
      res.send(tokens)
    } catch (error) {
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      await AuthService.logout(refreshToken)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  },
}
import express from 'express'
import {
  loginController,
  logoutController,
  registerController,
  userController,
} from './controller.js'

export const authRoute = express.Router()

authRoute.post('/login', loginController)
authRoute.get('/logout', logoutController)
authRoute.post('/register', registerController)
authRoute.get('/user', userController)

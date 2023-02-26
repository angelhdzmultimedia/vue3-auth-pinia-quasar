import { users } from '../db/index.js'
import { randomUUID } from 'node:crypto'

export async function loginController(req, res) {
  const { email, password } = req.body

  const user = users.find((item) => item.email === email)

  if (!user) {
    return res.status(404).send({
      statusMessage: 'User not found',
      statusCode: 404,
    })
  }

  if (password !== user.password) {
    return res.status(403).send({
      statusMessage: 'Email or password not valid',
      statusCode: 403,
    })
  }

  const authUser = {
    ...user,
    password: undefined,
  }

  req.session.user = authUser

  return res.status(200).send(authUser)
}

export async function logoutController(req, res) {
  req.session.destroy(() => {})
  return res.end()
}

export async function userController(req, res) {
  if (!req.session.user) {
    return res.status(403).send({
      statusMessage: 'Session not valid',
      statusCode: 404,
    })
  }
  return res.send(req.session.user)
}

export async function registerController(req, res) {
  const { email, password, name, username } = req.body

  const user = users.find((item) => item.email === email)

  if (user) {
    return res.status(409).send({
      statusMessage: 'User already exists',
      statusCode: 409,
    })
  }

  const newUser = {
    email,
    password,
    name,
    username,
    id: randomUUID(),
  }

  users.push(newUser)

  return res.status(201).send({
    ...newUser,
    password: undefined,
  })
}

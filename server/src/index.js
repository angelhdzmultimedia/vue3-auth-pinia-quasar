import express from 'express'
import cors from 'cors'
import { randomUUID } from 'node:crypto'

const clientUrl =
  'https://nodec1wgxq-v3ed--5173.local-credentialless.webcontainer.io'

const users = []

class HttpError extends Error {
  statusMessage = ''
  statusCode = -1
  constructor(error) {
    super(error.statusMessage)
    this.statusCode = error.statusCode
    this.statusMessage = error.statusMessage
  }
}

const app = express()
app.use(
  cors({
    origin: '*',
  })
)
const authRouter = express.Router()
app.use(express.json())

authRouter.post('/login', (req, res) => {
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

  return res.status(200).send({
    ...user,
    password: undefined,
  })
})

authRouter.post('/register', (req, res) => {
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
})

authRouter.get('/user', (req, res) => {
  return res.status(404).send({
    statusMessage: 'User not found',
    statusCode: 404,
  })
})

app.use((req, res, next) => {
  if (!req.url.startsWith('/api')) {
    return res.redirect(`${clientUrl}${req.url}`)
  }
  return next()
})

app.use('/api/auth', authRouter)

app.listen(5000, () => {
  console.log('Servidor escuchando en puerto 5000...')
})

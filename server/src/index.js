import express from 'express'
import cors from 'cors'
import { authRoute } from './auth/route.js'
import session from 'express-session'

const clientUrl =
  'https://nodec1wgxq-v3ed--5173.local-credentialless.webcontainer.io'

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

app.use(
  session({
    secret: 'aas-d9ASdenmxxSD09akoa-d9S990s9dfg0d',
    cookie: {
      maxAge: 3600000,
    },
    saveUninitialized: false,
    resave: false,
  })
)

app.use(express.json())

app.use((req, res, next) => {
  if (!req.url.startsWith('/api')) {
    return res.redirect(`${clientUrl}${req.url}`)
  }
  return next()
})

app.use('/api/auth', authRoute)

app.listen(5000, () => {
  console.log('Servidor escuchando en puerto 5000...')
})

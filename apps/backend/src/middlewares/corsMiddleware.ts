import cors from 'cors'
import { StatusCodes } from 'http-status-codes'

export const corsMiddleware = cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionsSuccessStatus: StatusCodes.OK
})

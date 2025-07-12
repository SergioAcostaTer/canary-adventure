import { JWT_EXPIRES_IN_SECONDS } from '@/config/auth'
import { IAccessToken, IJwtUser } from '@/contracts/jwt'
import jwt, { SignOptions } from 'jsonwebtoken'

export const jwtSign = (id: string): IAccessToken => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN_SECONDS
  }

  const accessToken = jwt.sign({ id }, secret, options)
  return { accessToken }
}

export const jwtVerify = ({ accessToken }: { accessToken: string }) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.verify(accessToken, secret) as IJwtUser
}

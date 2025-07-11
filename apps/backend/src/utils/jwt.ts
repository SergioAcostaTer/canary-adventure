import jwt, { SignOptions } from 'jsonwebtoken'

import { IAccessToken, IJwtUser } from '@/contracts/jwt'

export const jwtSign = (id: string): IAccessToken => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  const options: SignOptions = {
    expiresIn: 1000 * 60 * 60 * 24 * 7
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

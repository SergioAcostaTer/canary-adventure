import { Request } from 'express'

export const getAccessToken = (req: Request): string | undefined => {
  const authHeader = req.headers.authorization
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.split(' ')[1]
  }

  return req.cookies?.accessToken
}

import { NextFunction, Request, Response } from 'express'

import { redis } from '@/dataSources'
import { userService } from '@/services'
import { getAccessTokenFromHeaders } from '@/utils/headers'
import { jwtVerify } from '@/utils/jwt'

export const authMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { accessToken } = getAccessTokenFromHeaders(req.headers)
    if (!accessToken) return next()

    const isRevoked = await redis.get(`expiredToken:${accessToken}`)
    if (isRevoked) return next()

    const { id } = jwtVerify({ accessToken })
    if (!id) return next()

    const user = await userService.getUserById(id)
    if (!user) return next()

    Object.assign(req, {
      context: { user, accessToken }
    })

    next()
  } catch {
    next()
  }
}

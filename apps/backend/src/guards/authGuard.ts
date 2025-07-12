import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { IContextRequest, IUserRequest } from '@/contracts/request'
import { UserPlan, UserRole } from '@/contracts/user'

export const authGuard = {
  isAuth: (
    req: IContextRequest<IUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.context?.user
    if (user) return next()

    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Authentication required'
    })
  },

  isGuest: (
    req: IContextRequest<IUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.context?.user
    if (!user) return next()

    return res.status(StatusCodes.FORBIDDEN).json({
      status: StatusCodes.FORBIDDEN,
      message: 'Guests only — already authenticated'
    })
  },

  isVerified: (
    req: IContextRequest<IUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.context?.user
    if (user?.verified) return next()

    return res.status(StatusCodes.FORBIDDEN).json({
      status: StatusCodes.FORBIDDEN,
      message: 'User must be verified to access this resource'
    })
  },

  isUnverified: (
    req: IContextRequest<IUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.context?.user
    if (user && !user.verified) return next()

    return res.status(StatusCodes.FORBIDDEN).json({
      status: StatusCodes.FORBIDDEN,
      message: 'This resource is only available to unverified users'
    })
  },

  hasRole:
    (...roles: UserRole[]) =>
    (req: IContextRequest<IUserRequest>, res: Response, next: NextFunction) => {
      const user = req.context?.user
      if (user && roles.includes(user.role)) return next()

      return res.status(StatusCodes.FORBIDDEN).json({
        status: StatusCodes.FORBIDDEN,
        message: `Access denied: requires role ${roles.join(', ')}`
      })
    },

  hasPlan:
    (...plans: UserPlan[]) =>
    (req: IContextRequest<IUserRequest>, res: Response, next: NextFunction) => {
      const user = req.context?.user
      if (user && plans.includes(user.plan)) return next()

      return res.status(StatusCodes.FORBIDDEN).json({
        status: StatusCodes.FORBIDDEN,
        message: `Access denied: requires plan ${plans.join(', ')}`
      })
    }
}

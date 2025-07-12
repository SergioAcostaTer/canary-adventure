import { NextFunction, Request, Response } from 'express'

export const languageMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const user = req.context?.user
  const acceptLang = req.headers['accept-language']
  const supported = ['es', 'en', 'de']
  const fallback = user?.language || 'en'

  req.language =
    supported.find(lang => acceptLang?.toLowerCase().includes(lang)) ?? fallback

  next()
}

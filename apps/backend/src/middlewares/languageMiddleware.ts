import { NextFunction, Request, Response } from 'express'

export const languageMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const userLang = req.context?.user?.language
  const acceptLang = req.headers['accept-language'] ?? ''
  const supported = ['es', 'en', 'de']
  const fallback = 'en'
  const acceptedLanguages = acceptLang
    .split(',')
    .map(part => part.split(';')[0].trim().toLowerCase())

  const matchedLang = acceptedLanguages.find(lang => supported.includes(lang))

  req.language = matchedLang || supported.find(l => userLang === l) || fallback

  console.log(`Language set to: ${req.language}`)

  next()
}

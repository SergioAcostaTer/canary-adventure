import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

import { IUser } from './user'

/**
 * Request con contexto personalizado, e.g. req.context.user
 */
export interface IContextRequest<T = any> extends Omit<Request, 'context'> {
  context: T
}

/**
 * Request con body tipado
 */
export interface IBodyRequest<T> extends Omit<Request, 'body'> {
  body: T
}

/**
 * Request con params tipados (URL params)
 */
export interface IParamsRequest<T> extends Request {
  params: T & ParamsDictionary
}

/**
 * Request con query tipado (?param=...)
 */
export interface IQueryRequest<T> extends Request {
  query: T & ParamsDictionary
}

/**
 * Request con múltiples secciones tipadas (body, params, query, context)
 */
export interface ICombinedRequest<
  Context = unknown,
  Body = unknown,
  Params = Record<string, unknown>,
  Query = Record<string, unknown>
> extends Pick<IContextRequest<Context>, 'context'>,
    Pick<IBodyRequest<Body>, 'body'>,
    Pick<IParamsRequest<Params>, 'params'>,
    Pick<IQueryRequest<Query>, 'query'> {}

/**
 * Tipo concreto para el contexto de autenticación
 */
export interface IUserRequest {
  user: IUser
  accessToken: string
}

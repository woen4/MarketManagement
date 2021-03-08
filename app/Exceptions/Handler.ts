import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error, ctx) {
    if (error.code === '23503') {
      return ctx.response.status(404).send('One of the referenced ids does not found')
    }

    //return ctx.response.status(403).send(error.message)

    return super.handle(error, ctx)
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConvertId {
  public async handle({ params }: HttpContextContract, next: () => Promise<void>) {
    Object.assign(params, { id: Number(params.id) })
    await next()
  }
}

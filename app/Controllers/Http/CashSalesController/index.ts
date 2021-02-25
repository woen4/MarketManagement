import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import { getSerializedItems } from 'App/Utils'
import CashSale from 'App/Models/CashSale'

export default class CashSalesController {
  public async create({ request, response }: HttpContextContract) {
    const { rebate, items }: CreateCashSale = request.only(['rebate', 'items'])
    const serializedItems = getSerializedItems(items)
    const cashsale = new CashSale()
    cashsale.rebate = rebate

    await cashsale.save()
    await cashsale.related('products').attach(serializedItems)
    await cashsale.save()

    //Update inventory
    Event.emit('new:sale', items)

    return response.status(201)
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page') || 1
    const perPage = 10
    const cashsales = await CashSale.query().preload('products').paginate(page, perPage)
    return cashsales
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params
    const [cashsale] = await CashSale.query().preload('products').where({ id })
    if (!cashsale) return response.status(404)
    return cashsale
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const cashsale = await CashSale.query().where({ id }).delete()
    if (!cashsale) return response.status(404)
    return response.status(204)
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CashSale from 'App/Models/CashSale'
import { getSerializedItems } from 'App/utils'

export default class CashSalesController {
  public async create({ request, response }: HttpContextContract) {
    const { rebate, items }: CashSaleData = request.only(['rebate', 'items'])
    const serializedItems = getSerializedItems(items)
    const cashsale = new CashSale()

    cashsale.rebate = rebate
    await cashsale.save()
    await cashsale.related('products').attach(serializedItems)
    await cashsale.save()

    return response.status(201)
  }

  public async index() {
    const cashsales = await CashSale.query().preload('products')
    return cashsales
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params
    const [cashsale] = await CashSale.query().preload('products').where({ id })
    return cashsale
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    await CashSale.query().where({ id }).delete()
    return response.status(204)
  }
}

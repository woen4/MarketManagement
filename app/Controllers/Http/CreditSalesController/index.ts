import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreditSale from 'App/Models/CreditSale'
import { getSerializedItems } from 'App/utils'

export default class CreditSalesController {
  public async create({ request, response }: HttpContextContract) {
    const { items, rebate, customerId }: CreditSaleData = request.only([
      'customerId',
      'rebate',
      'items',
    ])

    const serializedItems = getSerializedItems(items)
    const creditSale = await CreditSale.create({ customerId, rebate })
    await creditSale.related('products').attach(serializedItems)

    return response.status(201)
  }

  public async index() {
    const creditSales = await CreditSale.query().preload('products')
    return creditSales
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params
    const [creditSale] = await CreditSale.query().preload('products').where({ id })
    return creditSale
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    await CreditSale.query().where({ id }).delete()
    return response.status(204)
  }
}

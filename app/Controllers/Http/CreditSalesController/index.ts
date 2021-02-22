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

  public async find() {
    const creditSales = await CreditSale.all()
    return creditSales
  }

  public async index({ params }: HttpContextContract) {
    const { id } = params
    const creditSale = await CreditSale.find(id)
    return creditSale
  }

  public async delete({ params }: HttpContextContract) {
    const { id } = params
    const creditSale = await CreditSale.findOrFail(id)
    await creditSale.delete()
    return creditSale
  }
}

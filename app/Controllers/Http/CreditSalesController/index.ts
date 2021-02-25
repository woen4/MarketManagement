import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import CreditSale from 'App/Models/CreditSale'
import { getSerializedItems } from 'App/Utils'

export default class CreditSalesController {
  public async create({ request, response }: HttpContextContract) {
    const { items, rebate, customerId }: CreateCreditSale = request.only([
      'customerId',
      'rebate',
      'items',
      'openAt',
    ])

    const serializedItems = getSerializedItems(items)
    const emptyCreditSale = await CreditSale.create({ customerId, rebate })
    await emptyCreditSale.related('products').attach(serializedItems)

    const creditSale = await CreditSale.query()
      .preload('products')
      .where({ id: emptyCreditSale.$original.id })
      .firstOrFail()

    //Update inventory
    Event.emit('new:sale', items)

    //Update payable this customer
    const creditSaleData = creditSale.serialize() as CreditSaleData
    Event.emit('new:creditsale', creditSaleData)

    return response.status(201)
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page') || 1
    const perPage = 10
    const creditSales = await CreditSale.query().preload('products').paginate(page, perPage)
    return creditSales
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const creditSale = await CreditSale.query().preload('products').where({ id }).first()
    if (!creditSale) return response.status(404)
    return creditSale
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const creditSale = await CreditSale.query().where({ id }).delete()
    if (!creditSale) return response.status(404)
    return response.status(204)
  }
}

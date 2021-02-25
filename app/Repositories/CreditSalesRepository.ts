import CreditSale from 'App/Models/CreditSale'
import { getSerializedItems } from 'App/Utils'

export default class CreditSalesRepository {
  public async create(data: RepoCreditSale) {
    const serializedItems = getSerializedItems(data.items)
    delete data.items
    const creditsale = await CreditSale.create(data)
    await creditsale.related('products').attach(serializedItems)

    return creditsale
  }

  public async index(page: number, perPage: number) {
    const creditSales = await CreditSale.query()
      .preload('products')
      .preload('customer')
      .paginate(page, perPage)

    return creditSales
  }

  public async show(id: number) {
    const creditSale = await CreditSale.query()
      .preload('products')
      .preload('customer')
      .where({ id })
      .first()

    return creditSale
  }

  public async destroy(id: number) {
    const creditSale = await CreditSale.query().where({ id }).delete()
    return creditSale
  }
}

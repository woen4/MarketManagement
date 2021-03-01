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

  public async findAll({ pagination, sort }: QueryOptions) {
    const { page, perPage } = pagination
    const { orderBy, direction } = sort

    const creditSales = await CreditSale.query()
      .preload('products')
      .preload('customer')
      .orderBy(orderBy, direction)
      .paginate(page, perPage)

    return creditSales
  }

  public async findOne(query: object) {
    const creditSale = await CreditSale.query()
      .preload('products')
      .preload('customer')
      .where(query)
      .first()

    return creditSale
  }

  public async destroy(id: number) {
    const creditSale = await CreditSale.query().where({ id }).delete()
    return creditSale
  }
}

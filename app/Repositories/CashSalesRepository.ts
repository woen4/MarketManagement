import CashSale from 'App/Models/CashSale'

export default class CashSalesRepository {
  public async create(data: RepoCashSale) {
    const creditSale = new CashSale()
    creditSale.rebate = data.rebate
    await creditSale.save()
    await creditSale.related('products').attach(data.items)
    const { id } = await creditSale.save()

    const result = await this.findOne({ id })

    return result
  }

  public async findAll({ pagination, sort }: QueryOptions) {
    const { page, perPage } = pagination
    const { orderBy, direction } = sort

    const creditSales = await CashSale.query()
      .preload('products')
      .orderBy(orderBy, direction)
      .paginate(page, perPage)
    return creditSales
  }

  public async findOne(query: object) {
    const creditSale = await CashSale.query().preload('products').where(query).first()
    return creditSale
  }

  public async destroy(id: number) {
    const creditSale = await CashSale.query().where({ id }).delete().first()
    return creditSale
  }
}

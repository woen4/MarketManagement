import CashSaleRepository from 'App/Repositories/CashSalesRepository'
import { getSerializedItems } from 'App/Utils'
import Event from '@ioc:Adonis/Core/Event'

export default class CashSaleService {
  public repository: CashSaleRepository

  constructor() {
    this.repository = new CashSaleRepository()
  }

  public async create(data: CreateCashSale) {
    const { rebate, items } = data
    const serializedItems = getSerializedItems(items)
    const result = this.repository.create({ rebate, items: serializedItems })

    //Update inventory
    Event.emit('new:sale', items)

    return result
  }

  public async index({ page }: IndexParams) {
    const perPage = 10
    page = page || 1

    const result = await this.repository.index(page, perPage)
    return result
  }

  public async show({ id }: Params) {
    const result = await this.repository.show(id)
    return result
  }

  public async destroy({ id }: Params) {
    const result = await this.repository.destroy(id)
    return result
  }
}

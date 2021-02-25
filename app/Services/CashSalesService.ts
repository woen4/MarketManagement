import Event from '@ioc:Adonis/Core/Event'
import NotFoundException from 'App/Exceptions/NotFoundException'
import CashSalesRepository from 'App/Repositories/CashSalesRepository'
import { getSerializedItems } from 'App/Utils'

export default class CashSaleService {
  public repository: CashSalesRepository

  constructor() {
    this.repository = new CashSalesRepository()
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
    if (!result) throw new NotFoundException('cash sale')
    return result
  }

  public async destroy({ id }: Params) {
    const result = await this.repository.destroy(id)
    if (!result) throw new NotFoundException('cash sale')
    return result
  }
}

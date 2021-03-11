import Event from '@ioc:Adonis/Core/Event'
import NotFoundException from 'App/Exceptions/NotFoundException'
import CashSalesRepository from 'App/Repositories/CashSalesRepository'

export default class CashSaleService {
  public repository: CashSalesRepository

  constructor() {
    this.repository = new CashSalesRepository()
  }

  public async create(data: CreateCashSale) {
    const result = this.repository.create(data)

    //Update inventory
    await Event.emit('new:sale', data.items)

    return result
  }

  public async index(pagination: PaginationParam, sort: SortParam) {
    const result = await this.repository.findAll(pagination, sort)
    return result
  }

  public async show({ id }: Params) {
    const result = await this.repository.findOne({ id })
    if (!result) throw new NotFoundException('cash sale')
    return result
  }

  public async destroy({ id }: Params) {
    const result = await this.repository.destroy(id)
    if (!result) throw new NotFoundException('cash sale')

    return result
  }
}

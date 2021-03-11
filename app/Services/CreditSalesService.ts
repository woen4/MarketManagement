import Event from '@ioc:Adonis/Core/Event'
import NotFoundException from 'App/Exceptions/NotFoundException'
import CreditSalesRepository from 'App/Repositories/CreditSalesRepository'

export default class CashSaleService {
  public repository: CreditSalesRepository

  constructor() {
    this.repository = new CreditSalesRepository()
  }

  public async create(data: CreateCreditSale) {
    const { id } = await this.repository.create(data)

    //Update inventory
    await Event.emit('new:sale', data.items)

    const creditSales = await this.show({ id })

    await Event.emit('new:creditsale', creditSales.serialize() as CreditSaleData)

    return creditSales
  }

  public async index(pagination: PaginationParam, sort: SortParam) {
    const result = await this.repository.findAll(pagination, sort)
    return result
  }

  public async show({ id }: Params) {
    const result = await this.repository.findOne({ id })
    if (!result) throw new NotFoundException('credit sale')
    return result
  }

  public async destroy({ id }: Params) {
    const result = await this.repository.destroy(id)
    if (!result) throw new NotFoundException('credit sale')
    return result
  }
}

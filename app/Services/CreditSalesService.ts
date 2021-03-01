import Event from '@ioc:Adonis/Core/Event'
import NotFoundException from 'App/Exceptions/NotFoundException'
import CreditSalesRepository from 'App/Repositories/CreditSalesRepository'
import { getSerializedItems, buildQueryOptions } from 'App/Utils'

export default class CashSaleService {
  public repository: CreditSalesRepository

  constructor() {
    this.repository = new CreditSalesRepository()
  }

  public async create(data: CreateCreditSale) {
    const { items, ...newData } = data
    const serializedItems = getSerializedItems(items)

    const result = this.repository.create({
      items: serializedItems,
      ...newData,
    })

    //Update inventory
    Event.emit('new:sale', items)

    return result
  }

  public async index(params: IndexParams) {
    const queryOptions: QueryOptions = buildQueryOptions(params, 'createdAt', 'desc')

    const result = await this.repository.findAll(queryOptions)
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

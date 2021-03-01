import NotFoundException from 'App/Exceptions/NotFoundException'
import CustomersRepository from 'App/Repositories/CustomersRepository'
import { buildQueryOptions } from 'App/Utils'
export default class CashSaleService {
  public repository: CustomersRepository

  constructor() {
    this.repository = new CustomersRepository()
  }

  public async create(data: CreateCustomer) {
    const result = this.repository.create(data)

    return result
  }

  public async index(params: IndexParams) {
    const queryOptions: QueryOptions = buildQueryOptions(params, 'name', 'asc')

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

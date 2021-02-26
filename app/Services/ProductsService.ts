import NotFoundException from 'App/Exceptions/NotFoundException'
import ProductsRepository from 'App/Repositories/ProductsRepository'
import { buildQueryOptions } from 'App/Utils'
export default class CashSaleService {
  public repository: ProductsRepository

  constructor() {
    this.repository = new ProductsRepository()
  }

  public async create(data: CreateProduct) {
    const productWithThisCode = await this.repository.showByCode(data.code)

    if (productWithThisCode) {
      return //Error
    }

    const result = await this.repository.create(data)

    return result
  }

  public async index(params: IndexParams) {
    const queryOptions: QueryOptions = buildQueryOptions(params, 'name', 'asc')

    const result = await this.repository.index(queryOptions)
    return result
  }

  public async show({ id }: Params) {
    const result = await this.repository.show(id)
    if (!result) throw new NotFoundException('product')
    return result
  }

  public async destroy({ id }: Params) {
    const result = await this.repository.destroy(id)
    if (!result) throw new NotFoundException('product')
    return result
  }
}

import NotFoundException from 'App/Exceptions/NotFoundException'
import CustomersRepository from 'App/Repositories/CustomersRepository'
export default class CashSaleService {
  public repository: CustomersRepository

  constructor() {
    this.repository = new CustomersRepository()
  }

  public async create(data: CreateCustomer) {
    const result = this.repository.create(data)

    return result
  }

  public async index(pagination: PaginationParam, sort: SortParam) {
    const result = await this.repository.findAll(pagination, sort)
    return result
  }

  public async show(id: number) {
    const result = await this.repository.findOne({ id })
    if (!result) throw new NotFoundException('customer')
    return result
  }

  public async destroy(id: number) {
    const result = await this.repository.destroy(id)
    if (!result) throw new NotFoundException('customer')
    return result
  }

  public async update(data: Partial<UpdateCustomer>, id: number) {
    const customerId = await this.repository.update(data, id)
    if (!customerId) throw new NotFoundException('customer')
  }

  public async updatePayable(creditSale: CreditSaleData) {
    const { items, customerId } = creditSale
    const saleValue = items.reduce(
      (accumulator, { product, quantity }) => accumulator + product.sellPrice * quantity,
      0
    )
    const customer = await this.repository.findOne({ id: customerId })

    if (!customer) throw new NotFoundException('customer')

    const newCustomer = {
      payable: (customer.$attributes.payable -= saleValue),
    }

    await this.repository.update(newCustomer, customerId)
  }
}

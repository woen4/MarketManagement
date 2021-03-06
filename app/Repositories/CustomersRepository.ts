import Customer from 'App/Models/Customer'

export default class CustomersRepository {
  public async create(data: RepoCustomer) {
    const customer = await Customer.create(data)
    return customer
  }

  public async findAll(pagination: PaginationParam, sort: SortParam) {
    const { page, perPage } = pagination
    const { orderBy, direction } = sort

    const customers = await Customer.query().orderBy(orderBy, direction).paginate(page, perPage)
    return customers
  }

  public async findOne(query: object) {
    const customer = await Customer.query().where(query).first()
    return customer
  }

  public async update(customer: Partial<Customer>, id: number) {
    const customerUpdated = await Customer.query().where({ id }).update(customer).first()
    return customerUpdated
  }

  public async destroy(id: number) {
    const customer = await Customer.query().where({ id }).delete().first()
    return customer
  }
}

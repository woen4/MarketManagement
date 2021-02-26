import Customer from 'App/Models/Customer'

export default class CustomersRepository {
  public async create(data: RepoCustomer) {
    const customer = await Customer.create(data)
    return customer
  }

  public async index({ pagination, sort }: QueryOptions) {
    const { page, perPage } = pagination
    const { orderBy, direction } = sort

    const customers = await Customer.query().orderBy(orderBy, direction).paginate(page, perPage)
    return customers
  }

  public async show(id: number) {
    const customer = await Customer.query().where({ id }).first()
    return customer
  }

  public async destroy(id: number) {
    const customer = await Customer.query().where({ id }).delete()
    return customer
  }
}

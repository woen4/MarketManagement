import Customer from 'App/Models/Customer'

export default class CustomersRepository {
  public async create(customer: CreateCustomer) {}

  public async index(page: number, perPage: number) {}

  public async show(id: number) {}

  public async delete(id: number) {}
}

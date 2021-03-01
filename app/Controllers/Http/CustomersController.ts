import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomerService from 'App/Services/CustomersService'

class CustomersController {
  private service: CustomerService

  constructor() {
    this.service = new CustomerService()
  }

  public async create({ request, response }: HttpContextContract) {
    const data: CreateCustomer = request.only(['name', 'payable', 'phoneNumber'])
    const customer = await this.service.create(data)

    return response.status(201).json(customer)
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page')
    const sort = request.input('sort')

    const customers = await this.service.index({ page, sort })
    return customers
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const customer = await this.service.show(id)
    return response.status(200).json(customer)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    const data: UpdateProduct = request.only([
      'code',
      'name',
      'sellPrice',
      'buyPrice',
      'provider',
      'inventory',
    ])

    await this.service.update(data, id)

    response.status(204)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    await this.service.destroy(id)

    return response.status(204)
  }
}

export default CustomersController

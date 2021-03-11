import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomerService from 'App/Services/CustomersService'
import { buidSortOptions } from 'App/Utils'
class CustomersController {
  private service: CustomerService
  private fields = ['name', 'payable', 'phoneNumber']

  constructor() {
    this.service = new CustomerService()
  }

  public async create({ request, response }: HttpContextContract) {
    const data: CreateCustomer = request.only(this.fields)
    const customer = await this.service.create(data)

    return response.status(201).json(customer)
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page') || 1
    const sort = request.input('sort') || 'name+asc'

    const pagination = { page, perPage: 10 }

    const validFields = [...this.fields, 'lastPurchase']
    const sorting = buidSortOptions(sort, validFields)

    const customers = await this.service.index(pagination, sorting)
    return customers
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const customer = await this.service.show(id)
    return response.status(200).json(customer)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    const data: UpdateProduct = request.only(this.fields)

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

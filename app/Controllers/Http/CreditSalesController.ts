import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreditSaleService from 'App/Services/CreditSalesService'
import { buidSortOptions } from 'App/Utils'
export default class CreditSalesController {
  public service: CreditSaleService
  private fields = ['customerId', 'rebate', 'items', 'openAt']

  constructor() {
    this.service = new CreditSaleService()
  }

  public async create({ request, response }: HttpContextContract) {
    const data: CreateCreditSale = request.only(this.fields)
    const result = await this.service.create(data)

    return response.status(201).json(result)
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page') || 1
    const sort = request.input('sort') || 'createdAt+asc'

    const pagination = { page, perPage: 10 }
    const sorting = buidSortOptions(sort, this.fields)

    const creditSales = await this.service.index(pagination, sorting)

    return response.status(200).json(creditSales)
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params
    const creditSale = await this.service.show({ id })

    return response.status(200).json(creditSale)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    await this.service.destroy({ id })

    return response.status(204)
  }
}

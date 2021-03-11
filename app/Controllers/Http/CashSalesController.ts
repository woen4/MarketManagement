import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CashSaleService from 'App/Services/CashSalesService'
import { createCashSaleSchema } from 'App/Validations/cashSales'
import { buidSortOptions } from 'App/Utils'
export default class CashSalesController {
  public service: CashSaleService
  private fields = ['rebate', 'items']

  constructor() {
    this.service = new CashSaleService()
  }

  public async create({ request, response }: HttpContextContract) {
    await request.validate(createCashSaleSchema)
    const data: CreateCashSale = request.only(this.fields)

    const result = await this.service.create(data)

    return response.status(201).json(result)
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page') || 1
    const sort = request.input('sort') || 'createdAt+asc'

    const pagination = { page, perPage: 10 }
    const sorting = buidSortOptions(sort, ['rebate'])

    const cashSales = await this.service.index(pagination, sorting)

    return response.status(200).json(cashSales)
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params
    const cashSale = await this.service.show({ id })

    return response.status(200).json(cashSale)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    await this.service.destroy({ id })

    return response.status(204)
  }
}

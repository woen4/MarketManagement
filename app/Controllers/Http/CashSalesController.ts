import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CashSaleService from 'App/Services/CashSalesService'

export default class CashSalesController {
  public service: CashSaleService

  constructor() {
    this.service = new CashSaleService()
  }

  public async create({ request, response }: HttpContextContract) {
    const data: CreateCashSale = request.only(['rebate', 'items'])
    const result = await this.service.create(data)

    return response.status(201).json(result)
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page')
    const sort = request.input('sort')

    const cashSales = await this.service.index({ page, sort })

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

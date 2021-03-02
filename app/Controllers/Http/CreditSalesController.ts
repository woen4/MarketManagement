import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreditSaleService from 'App/Services/CreditSalesService'

export default class CreditSalesController {
  public service: CreditSaleService

  constructor() {
    this.service = new CreditSaleService()
  }

  public async create({ request, response }: HttpContextContract) {
    const data: CreateCreditSale = request.only(['customerId', 'rebate', 'items', 'openAt'])
    const result = await this.service.create(data)

    return response.status(201).json(result)
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page')
    const sort = request.input('sort')

    const creditSales = await this.service.index({ page, sort })

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

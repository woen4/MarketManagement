import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductService from 'App/Services/ProductsService'
export default class ProductsController {
  private service: ProductService

  constructor() {
    this.service = new ProductService()
  }
  public async create({ request, response }: HttpContextContract) {
    const data: CreateProduct = request.only([
      'code',
      'name',
      'inventory',
      'sellPrice',
      'buyPrice',
      'provider',
    ])
    const product = await this.service.create(data)

    return response.status(201).json(product)
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page')
    const sort = request.input('sort')

    const products = await this.service.index({ page, sort })
    return products
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const product = await this.service.show(id)
    return response.status(200).json(product)
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

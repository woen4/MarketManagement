import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductService from 'App/Services/ProductsService'
import { buidSortOptions } from 'App/Utils'
export default class ProductsController {
  private service: ProductService
  private fields = ['code', 'name', 'inventory', 'sellPrice', 'buyPrice', 'provider']

  constructor() {
    this.service = new ProductService()
  }
  public async create({ request, response }: HttpContextContract) {
    const data: CreateProduct = request.only(this.fields)
    const product = await this.service.create(data)

    return response.status(201).json(product)
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page') || 1
    const sort = request.input('sort') || 'name+asc'

    const pagination = { page, perPage: 10 }
    const sorting = buidSortOptions(sort, this.fields)

    const products = await this.service.index(pagination, sorting)
    return products
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const product = await this.service.show(id)
    return response.status(200).json(product)
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

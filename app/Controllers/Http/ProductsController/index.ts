import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
export default class ProductsController {
  private productProperties: string[] = [
    'code',
    'name',
    'stock',
    'sellPrice',
    'buyPrice',
    'provider',
  ]

  public async create({ request }: HttpContextContract) {
    const data: ProductData = request.only(this.productProperties)
    const product = await Product.create(data)
    return product
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page')
    const perPage = 10
    const products = await Product.query().paginate(page, perPage)
    return products
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const product = await Product.find(id)
    if (!product) return response.status(404)
    return product
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    const data: ProductData = request.only(this.productProperties)
    const product = await Product.find(id)
    if (!product) return response.status(404)
    product.merge({ ...data })
    await product.save()
    response.status(204)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const product = await Product.query().where({ id }).delete()
    if (!product) return response.status(404)
    response.status(204)
  }
}

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

  public async find({ request }: HttpContextContract) {
    const page = request.input('page')
    const perPage = 10
    const products = await Product.query().paginate(page, perPage)
    return products
  }

  public async index({ request }: HttpContextContract) {
    const id = request.input('id')
    const product = await Product.find(id)
    return product
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params
    const data: ProductData = request.only(this.productProperties)
    const product = await Product.findOrFail(id)
    product.merge({ ...data })
    await product.save()
    return product
  }

  public async delete({ params }: HttpContextContract) {
    const { id } = params
    const product = await Product.findOrFail(id)
    await product.delete()
    return product
  }
}

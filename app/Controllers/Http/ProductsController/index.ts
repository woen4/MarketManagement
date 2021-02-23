import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
export default class ProductsController {
  public async create({ request, response }: HttpContextContract) {
    const data: ProductCreateData = request.only([
      'code',
      'name',
      'stock',
      'sellPrice',
      'buyPrice',
      'provider',
    ])

    const productWithThisCode = await Product.query().where({ code: data.code }).first()

    if (productWithThisCode) {
      return response.status(403).send('A product with this code alredy exists')
    }

    const product = await Product.create(data)
    return product
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page') || 1
    const perPage = 10
    const [orderBy, direction] = request.input('sort')?.split('+') || ['name', null]

    const products = await Product.query().orderBy(orderBy, direction).paginate(page, perPage)
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
    const data: ProductUpdateData = request.only([
      'code',
      'name',
      'stock',
      'sellPrice',
      'buyPrice',
      'provider',
      'changeStock',
    ])
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

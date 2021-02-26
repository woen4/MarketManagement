import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import Product from 'App/Models/Product'
import cloneDeep from 'lodash/cloneDeep'
export default class ProductsController {
  public async create({ request, response }: HttpContextContract) {
    const data: CreateProduct = request.only([
      'code',
      'name',
      'inventory',
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
    const data: UpdateProduct = request.only([
      'code',
      'name',
      'sellPrice',
      'buyPrice',
      'provider',
      'inventory',
    ])
    const product = await Product.find(id)
    const oldProduct = cloneDeep(product)
    if (!product) return response.status(404)
    product.merge({ ...data })
    await product.save()

    Event.emit('update:product', {
      oldProduct,
      product: product as any,
    })

    response.status(204)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const product = await Product.query().where({ id }).delete()
    if (!product) return response.status(404)
    response.status(204)
  }

  public static async updateStock(items: Array<Item>) {
    for (const item of items) {
      const product = await Product.find(item.productId)
      if (!product) return
      product.$attributes.inventory -= item.quantity
      await product.save()
    }
  }
}

import Event from '@ioc:Adonis/Core/Event'
import NotFoundException from 'App/Exceptions/NotFoundException'
import ProductsRepository from 'App/Repositories/ProductsRepository'
import { buildQueryOptions } from 'App/Utils'

export default class CashSaleService {
  private repository: ProductsRepository

  constructor() {
    this.repository = new ProductsRepository()
  }

  public async create(data: CreateProduct) {
    const productWithThisCode = await this.repository.findOne({ code: data.code })

    if (productWithThisCode) {
      throw new Error('A product with these code alredy exists')
    }

    const result = await this.repository.create(data)

    return result
  }

  public async update(data: Partial<UpdateProduct>, id: number) {
    const product = await this.repository.findOne({ id })
    if (!product) throw new NotFoundException('product')

    //Verifies if the code has changed
    if (product.code !== data.code) {
      const productWithThisCode = await this.repository.findOne({ code: data.code })
      if (productWithThisCode) throw new Error('This code is already being used by another product')
    }

    await this.repository.update(data, id)

    await Event.emit('update:product', {
      product: product.$original as ProductData,
      newProduct: product.merge(data).$attributes as ProductData,
    })
  }

  public async index(params: IndexParams) {
    const queryOptions: QueryOptions = buildQueryOptions(params, 'name', 'asc')

    const result = await this.repository.findAll(queryOptions)
    return result
  }

  public async show(id: number) {
    const result = await this.repository.findOne({ id })
    if (!result) throw new NotFoundException('product')
    return result
  }

  public async destroy(id: number) {
    const result = await this.repository.destroy(id)
    if (!result) throw new NotFoundException('product')
    return result
  }

  //On new:sale
  public async updateInventory(items: Array<Item>) {
    for (const item of items) {
      const product = await this.repository.findOne({ id: item.productId })
      if (!product) throw new NotFoundException('product')
      const newProduct = {
        inventory: (product.$attributes.inventory -= item.quantity),
      }
      product.$attributes.inventory -= item.quantity
      this.repository.update(newProduct, item.productId)
    }
  }
}

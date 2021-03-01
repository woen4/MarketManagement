import Product from 'App/Models/Product'

export default class ProductsRepository {
  public async create(data: RepoProduct) {
    const result = await Product.create(data)
    return result
  }

  public async findAll({ pagination, sort }: QueryOptions) {
    const { page, perPage } = pagination
    const { orderBy, direction } = sort

    const products = await Product.query().orderBy(orderBy, direction).paginate(page, perPage)
    return products
  }

  public async findOne(query: object) {
    const product = await Product.query().where(query).first()
    return product
  }

  public async update(product: Partial<Product>, id: number) {
    const productUpdated = await Product.query().where({ id }).update(product)
    return productUpdated
  }

  public async destroy(id: number) {
    const product = await Product.query().where({ id }).delete().first()
    return product
  }
}

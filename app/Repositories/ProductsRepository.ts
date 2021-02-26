import Product from 'App/Models/Product'

export default class ProductsRepository {
  public async create(product: RepoProduct) {}

  public async index({ pagination, sort }: QueryOptions) {
    const { page, perPage } = pagination
    const { orderBy, direction } = sort

    const products = await Product.query().orderBy(orderBy, direction).paginate(page, perPage)
    return products
  }

  public async show(id: number) {
    const product = await Product.query().where({ id }).first()
    return product
  }

  public async destroy(id: number) {
    const product = await Product.query().where({ id }).delete()
    return product
  }

  public async showByCode(code: string) {
    const product = await Product.query().where({ code }).first()
    return product
  }
}

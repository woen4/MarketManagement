import InventoryInputsRepository from 'App/Repositories/InventoryInputsRepository'

export default class InventoryInputsService {
  private repository: InventoryInputsRepository

  constructor() {
    this.repository = new InventoryInputsRepository()
  }

  public async create({ product, newProduct }: CreateInventoryInput) {
    const { inventory } = product
    const { buyPrice, id, inventory: newInventory } = newProduct
    const inputedQuantity = newInventory - inventory

    //It should be registered if the inputed quantity be more than 0
    if (inputedQuantity < 0) {
      return
    }

    const value = buyPrice * inputedQuantity

    await this.repository.create({
      productId: id,
      inputedQuantity,
      value,
    })
  }

  public async index(pagination: PaginationParam, sort: SortParam) {
    const result = await this.repository.findAll(pagination, sort)
    return result
  }
}

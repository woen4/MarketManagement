import InventoryInputsRepository from 'App/Repositories/InventoryInputsRepository'
import { buildQueryOptions } from 'App/Utils'

export default class InventoryInputsService {
  private repository: InventoryInputsRepository

  constructor() {
    this.repository = new InventoryInputsRepository()
  }

  public async create({ product, newProduct }: CreateInventoryInput) {
    const { inventory } = product
    const { buyPrice, id, inventory: newInventory } = newProduct
    const inputedQuantity = newInventory - inventory

    //It should be registered if the input quantity be more than 0
    if (inputedQuantity < 0) {
      return
    }

    const value = buyPrice * inputedQuantity

    await this.repository.create({
      productId: id,
      inputedQuantity,
      buyPrice,
      value,
    })
  }

  public async index(params: IndexParams) {
    const queryOptions: QueryOptions = buildQueryOptions(params, 'createdAt', 'desc')

    const result = await this.repository.findAll(queryOptions)
    return result
  }
}

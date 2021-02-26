import InventoryInputsRepository from 'App/Repositories/InventoryInputsRepository'
import { buildQueryOptions } from 'App/Utils'

export default class InventoryInputsService {
  public repository: InventoryInputsRepository

  constructor() {
    this.repository = new InventoryInputsRepository()
  }

  public static async create({ oldProduct, product }: CreateInventoryInput) {
    const { inventory: oldInventory } = oldProduct.$original
    const { buyPrice, id, inventory } = product.$original
    const inputedQuantity = inventory - oldInventory
    const value = buyPrice * inputedQuantity

    const result = await InventoryInputsRepository.create({
      productId: id,
      inputedQuantity,
      buyPrice,
      value,
    })

    return result
  }

  public async index(params: IndexParams) {
    const queryOptions: QueryOptions = buildQueryOptions(params, 'createdAt', 'desc')

    const result = await this.repository.index(queryOptions)
    return result
  }
}

import InventoryInputs from 'App/Schemas/InventoryInput'

export default class InventoryInputsRepository {
  public static async create(data: RepoInventoryInput) {
    const result = await InventoryInputs.create(data)
    return result
  }

  public async index({ pagination, sort }: QueryOptions) {
    const { page, perPage } = pagination
    const { orderBy, direction } = sort

    const selectedFields = { _id: 0, __v: 0, updatedAt: 0 }
    const sortBy = { [orderBy]: direction }

    const inventoryInputs = await InventoryInputs.find()
      .sort(sortBy)
      .select(selectedFields)
      .skip(perPage * (page - 1))
      .limit(perPage)

    return inventoryInputs
  }
}

import InventoryInputs from 'App/Schemas/InventoryInput'

export default class InventoryInputsRepository {
  public async create(inventoryInput: CreateInventoryInput) {}

  public async index(page: number, perPage: number) {}

  public async show(id: number) {}

  public async delete(id: number) {}
}

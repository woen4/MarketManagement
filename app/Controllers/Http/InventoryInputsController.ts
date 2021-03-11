import InventoryInputs from 'App/Schemas/InventoryInput'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InventoryInputsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page') || 1
    const perPage = 10
    const unselectedFields = { _id: 0, __v: 0, updatedAt: 0 }
    const [orderBy, direction] = request.input('sort')?.split('+') || ['name', 'asc']
    const sortBy = { [orderBy]: direction }

    const inventoryInputs = await InventoryInputs.find()
      .sort(sortBy)
      .select(unselectedFields)
      .skip(perPage * (page - 1))
      .limit(perPage)

    return inventoryInputs
  }
}

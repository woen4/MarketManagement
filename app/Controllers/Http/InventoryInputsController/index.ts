import InventoryInputs from 'App/Schemas/InventoryInput'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InventoryInputsController {
  public static async create({ oldProduct, product }: CreateInventoryInput) {
    const { inventory: oldInventory } = oldProduct.$original
    const { buyPrice, id, inventory } = product.$original
    const inputedQuantity = inventory - oldInventory

    await InventoryInputs.create({
      productId: id,
      inputedQuantity,
      buyPrice,
      value: buyPrice * inputedQuantity,
    })
  }
}

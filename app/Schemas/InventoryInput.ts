import { Schema, model } from 'mongoose'

const InventoryInputSchema = new Schema(
  {
    productId: Number,
    inputedQuantity: Number,
    buyPrice: Number,
    value: Number,
  },
  { timestamps: true }
)

export default model('InventoryInput', InventoryInputSchema)

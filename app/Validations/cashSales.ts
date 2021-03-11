import { schema } from '@ioc:Adonis/Core/Validator'

const createCashSaleSchema = {
  schema: schema.create({
    rebate: schema.number(),
    items: schema.array().members(
      schema.object().members({
        quantity: schema.number(),
        productId: schema.number(),
      })
    ), // convert to number and validate
  }),
}

export { createCashSaleSchema }

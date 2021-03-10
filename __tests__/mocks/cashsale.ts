import ProductMock from './product'
import request from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

export default async function CashSaleMock() {
  const productMock = ProductMock()
  const response = await request(BASE_URL).post('/products').send(productMock.creationData)
  const product = { provider: null, ...response.body }

  const creationData = {
    rebate: 0,
    items: [
      {
        quantity: 1,
        productId: product.id,
      },
    ],
  }

  const cashSaleValid = {
    rebate: 0,
    products: [{ ...product, inventory: product.inventory - 1 }],
    rawValue: 5,
    value: 5,
  }

  return { creationData, cashSaleValid }
}

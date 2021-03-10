import ProductMock from './product'
import CustomerMock from './customer'
import request from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

export default async function CreditSaleMock() {
  const productMock = ProductMock()
  const customerMock = CustomerMock()

  const responseProduct = await request(BASE_URL).post('/products').send(productMock.creationData)
  delete responseProduct.body.priceWithTax
  const product = { provider: null, ...responseProduct.body }

  const responseCustomer = await request(BASE_URL)
    .post('/customers')
    .send(customerMock.creationData)

  const openAt = '2021-03-10T16:19:29.467-03:00'
  const creationData = {
    customerId: responseCustomer.body.id,
    openAt,
    rebate: 0,
    items: [
      {
        quantity: 1,
        productId: product.id,
      },
    ],
  }

  const creditSaleValid = {
    rebate: 0,
    openAt,
    customerId: responseCustomer.body.id,
    customer: responseCustomer.body,
    items: [{ product: { ...product, inventory: product.inventory - 1 }, quantity: 1 }],
    rawValue: 5,
    value: 5,
  }

  return { creationData, creditSaleValid }
}

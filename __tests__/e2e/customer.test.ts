import test from 'japa'
import request from 'supertest'
import CustomerMock from '../mocks/customer'
import { clearDatabase } from '../utils'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Customers tests', async (group) => {
  let customerMock = CustomerMock()
  group.beforeEach(async () => {
    await clearDatabase()
  })

  group.afterEach(async () => {
    await clearDatabase()
  })

  async function createCustomer() {
    const response = await request(BASE_URL).post('/customers').send(customerMock.creationData)
    return response.body
  }

  test('customer creating', async (assert) => {
    const response = await request(BASE_URL)
      .post('/customers')
      .send(customerMock.creationData)
      .expect(201)
    const { id, createdAt, lastPurchase, ...received } = response.body

    assert.isNumber(id)
    assert.isString(createdAt)
    assert.isString(lastPurchase)

    assert.deepEqual(received, customerMock.customerValid)
  })

  test('customer listing', async (assert) => {
    const expected = await createCustomer()
    const response = await request(BASE_URL).get(`/customers`).expect(200)
    const received = response.body.data

    assert.includeDeepMembers(received, [expected])
  })

  test('customer showing', async (assert) => {
    const customer = await createCustomer()
    const { body } = await request(BASE_URL).get(`/customers/${customer.id}`).expect(200)
    assert.deepEqual(body, customer)
  })

  test('customer deleting', async () => {
    const customer = await createCustomer()
    await request(BASE_URL).delete(`/customers/${customer.id}`).expect(204)

    await request(BASE_URL).get(`/customers/${customer.id}`).expect(404)
  })

  test('customer update payable on new credit sale', async (assert) => {
    const customer = await createCustomer()
    const productData = {
      code: '1',
      name: 'Product',
      inventory: 1,
      sellPrice: 10,
      buyPrice: 5,
    }
    const { body: product } = await request(BASE_URL).post('/products').send(productData)
    const creditSaleData = {
      customerId: customer.id,
      rebate: 0,
      openAt: '2021-02-19T15:43:38.803-03:00',
      items: [
        {
          quantity: 1,
          productId: product.id,
        },
      ],
    }
    const saleValue = creditSaleData.items[0].quantity * product.sellPrice
    await request(BASE_URL).post('/creditsales').send(creditSaleData)

    const { body: customerUpdated } = await request(BASE_URL)
      .get(`/customers/${customer.id}`)
      .expect(200)
    assert.deepEqual(customerUpdated.payable, customer.payable - saleValue)
  })
})

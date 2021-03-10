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

  test('should create a cash sale', async (assert) => {
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

  test('should list the existing cash sales', async (assert) => {
    const expected = await createCustomer()
    const response = await request(BASE_URL).get(`/customers`).expect(200)
    const received = response.body.data

    assert.includeDeepMembers(received, [expected])
  })

  test('should show a specfic cash sales', async (assert) => {
    const customer = await createCustomer()
    const { body } = await request(BASE_URL).get(`/customers/${customer.id}`).expect(200)
    assert.deepEqual(body, customer)
  })

  test('cash sales deleting', async () => {
    const customer = await createCustomer()
    await request(BASE_URL).delete(`/customers/${customer.id}`).expect(204)

    await request(BASE_URL).get(`/customers/${customer.id}`).expect(404)
  })
})

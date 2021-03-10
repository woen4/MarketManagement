import test from 'japa'
import request from 'supertest'
import CreditSaleMock from '../mocks/creditsale'
import { clearDatabase } from '../utils'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Credit sales tests', async (group) => {
  let creditSaleMock
  group.beforeEach(async () => {
    await clearDatabase()
    creditSaleMock = await CreditSaleMock()
  })

  group.afterEach(async () => {
    await clearDatabase()
  })

  async function createCreditSale() {
    const response = await request(BASE_URL).post('/creditsales').send(creditSaleMock.creationData)
    return response.body
  }

  test('should create a credit sale', async (assert) => {
    const response = await request(BASE_URL)
      .post('/creditsales')
      .send(creditSaleMock.creationData)
      .expect(201)
    const { id, ...received } = response.body

    assert.isNumber(id)
    assert.deepEqual(received, creditSaleMock.creditSaleValid)
  })

  test('should list the existing credit sales', async (assert) => {
    const expected = await createCreditSale()

    const response = await request(BASE_URL).get(`/creditsales`).expect(200)
    const received = response.body.data

    assert.includeDeepMembers(received, [expected])
  })

  test('should show a specfic product', async (assert) => {
    const creditSale = await createCreditSale()
    const { body } = await request(BASE_URL).get(`/creditsales/${creditSale.id}`).expect(200)
    assert.deepEqual(body, creditSale)
  })

  test('product deleting', async () => {
    const creditSale = await createCreditSale()
    await request(BASE_URL).delete(`/creditsales/${creditSale.id}`).expect(204)

    await request(BASE_URL).get(`/creditsales/${creditSale.id}`).expect(404)
  })
})

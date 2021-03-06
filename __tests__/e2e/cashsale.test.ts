import test from 'japa'
import request from 'supertest'
import CashSaleMock from '../mocks/cashsale'
import { clearDatabase } from '../utils'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Cash tests', async (group) => {
  let cashSaleMock
  group.beforeEach(async () => {
    await clearDatabase()
    cashSaleMock = await CashSaleMock()
  })

  group.afterEach(async () => {
    await clearDatabase()
  })

  async function createCashSale() {
    const response = await request(BASE_URL).post('/cashsales').send(cashSaleMock.creationData)
    return response.body
  }

  test('cash sales creating', async (assert) => {
    const response = await request(BASE_URL)
      .post('/cashsales')
      .send(cashSaleMock.creationData)
      .expect(201)
    const { id, createdAt, updatedAt, ...received } = response.body

    assert.isNumber(id)
    assert.isString(createdAt)
    assert.isString(updatedAt)

    assert.deepEqual(received, cashSaleMock.cashSaleValid)
  })

  test('cash sales listing', async (assert) => {
    const expected = await createCashSale()
    const response = await request(BASE_URL).get(`/cashsales`).expect(200)
    const received = response.body.data

    assert.includeDeepMembers(received, [expected])
  })

  test('cash sales showing', async (assert) => {
    const cashSale = await createCashSale()
    const { body } = await request(BASE_URL).get(`/cashsales/${cashSale.id}`).expect(200)
    assert.deepEqual(body, cashSale)
  })

  test('cash sales deleting', async () => {
    const cashSale = await createCashSale()
    await request(BASE_URL).delete(`/cashsales/${cashSale.id}`).expect(204)

    await request(BASE_URL).get(`/cashsales/${cashSale.id}`).expect(404)
  })
})

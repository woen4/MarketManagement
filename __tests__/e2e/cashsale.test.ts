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

  test('should create a cash sale', async (assert) => {
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

  test('should list the existing cash sales', async (assert) => {
    const expected = await createCashSale()
    console.log({ expected })
    const response = await request(BASE_URL).get(`/cashsales`).expect(200)
    const received = response.body.data

    assert.includeDeepMembers(received, [expected])
  })

  test('should show a specfic product', async (assert) => {
    const cashSale = await createCashSale()
    const { body } = await request(BASE_URL).get(`/cashsales/${cashSale.id}`).expect(200)
    assert.deepEqual(body, cashSale)
  })

  test('product deleting', async () => {
    const cashSale = await createCashSale()
    await request(BASE_URL).delete(`/cashsales/${cashSale.id}`).expect(204)

    await request(BASE_URL).get(`/cashsales/${cashSale.id}`).expect(404)
  })
})

import test from 'japa'
import request from 'supertest'
import ProductMock from '../mocks/product'
import { clearDatabase } from '../utils'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Inventory inputs tests', (group) => {
  group.before(async () => {
    await clearDatabase()
  })

  group.after(async () => {
    await clearDatabase()
  })

  async function createProduct() {
    const productMock = ProductMock()
    const response = await request(BASE_URL).post('/products').send(productMock.creationData)
    return { provider: null, ...response.body }
  }

  test('inventory input creating', async (assert) => {
    const product = await createProduct()
    const quantityChanged = 1
    await request(BASE_URL)
      .put(`/products/${product.id}`)
      .send({
        inventory: product.inventory + quantityChanged,
      })

    const response = await request(BASE_URL).get(`/inventoryinputs`).expect(200)

    const { createdAt, ...received } = response.body[0]
    const expected = {
      productId: product.id,
      inputedQuantity: quantityChanged,
      value: product.buyPrice * quantityChanged,
    }
    assert.isString(createdAt)
    assert.includeDeepMembers([received], [expected])
  })
})

import test from 'japa'
import request from 'supertest'
import ProductModel from 'App/Models/Product'
import ProductMock from '../mocks/product'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Product service', (group) => {
  group.before(async () => {
    await ProductModel.query().delete()
  })

  group.after(async () => {
    await ProductModel.query().delete()
  })

  async function createProduct() {
    const productMock = ProductMock()
    const response = await request(BASE_URL).post('/products').send(productMock.creationData)
    return { provider: null, ...response.body }
  }
  test('should create a product', async (assert) => {
    const productMock = ProductMock()
    const response = await request(BASE_URL)
      .post('/products')
      .send(productMock.creationData)
      .expect(201)
    const { id, ...received } = response.body
    const { provider, ...expected } = productMock.productValid

    assert.isNumber(id)
    assert.deepEqual(received, expected)
  })

  test('should list the existing products', async (assert) => {
    const product = await createProduct()
    const expected = [{ ...product, id: product.id }]
    const response = await request(BASE_URL).get(`/products`).expect(200)
    const received = response.body.data

    assert.includeDeepMembers(received, expected)
  })

  test('product showing', async (assert) => {
    const product = await createProduct()
    const { body } = await request(BASE_URL).get(`/products/${product.id}`).expect(200)
    assert.deepEqual(body, product)
  })

  test('product updating', async (assert) => {
    const product = await createProduct()
    await request(BASE_URL)
      .put(`/products/${product.id}`)
      .send({
        name: 'Updated Product',
      })
      .expect(204)

    const { body } = await request(BASE_URL).get(`/products/${product.id}`).expect(200)
    assert.deepEqual(body, { ...product, name: 'Updated Product' })
  })

  test('product deleting', async () => {
    const product = await createProduct()
    await request(BASE_URL).delete(`/products/${product.id}`).expect(204)

    await request(BASE_URL).get(`/products/${product.id}`).expect(404)
  })
})

import test from 'japa'
import supertest from 'supertest'
import Product from 'App/Models/Product'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const mocks = {
  productValid: require('../mocks/product-valid.json'),
}

test.group('Product CRUD', (group) => {
  test('product creation', async (assert) => {
    const data = {
      code: '1',
      name: 'Product',
      inventory: 1,
      sellPrice: 5,
      buyPrice: 10,
    }
    const response = await supertest(BASE_URL).post('/products').send(data).expect(201)

    assert.deepEqual({ ...response.body, provider: null }, mocks.productValid)
  })

  test('product listing', async (assert) => {
    const response = await supertest(BASE_URL).get('/products').expect(200)
    const { data } = response.body

    assert.deepEqual(data, [mocks.productValid])
  })

  test('product showing', async (assert) => {
    const productId = mocks.productValid.id
    const { body } = await supertest(BASE_URL).get(`/products/${productId}`).expect(200)
    assert.deepEqual(body, mocks.productValid)
  })

  test('product updating', async (assert) => {
    const productId = mocks.productValid.id
    await supertest(BASE_URL)
      .put(`/products/${productId}`)
      .send({
        name: 'Updated Product',
      })
      .expect(204)

    const { body } = await supertest(BASE_URL).get(`/products/${productId}`).expect(200)
    assert.deepEqual(body, { ...mocks.productValid, name: 'Updated Product' })
  })

  test('product deleting', async () => {
    const productId = mocks.productValid.id
    await supertest(BASE_URL).delete(`/products/${productId}`).expect(204)
  })
})

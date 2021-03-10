export default function ProductMock() {
  const code = Math.ceil(Math.random() * 1000).toString()

  const creationData = {
    code,
    name: 'Product',
    inventory: 1,
    sellPrice: 5,
    buyPrice: 10,
  }

  const productValid = {
    code,
    name: 'Product',
    inventory: 1,
    sellPrice: 5,
    provider: null,
    priceWithTax: 13,
    buyPrice: 10,
  }

  return { productValid, creationData }
}

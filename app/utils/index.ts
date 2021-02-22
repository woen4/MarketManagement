export function sum(values: object[], key: string) {
  return values.reduce((accumulator, currentValue) => {
    return accumulator + currentValue[key]
  }, 0)
}

export function getSerializedItems(items: Array<Item>) {
  const itemsSerializeds = {}
  items.forEach(({ quantity, productId }) => {
    Object.assign(itemsSerializeds, { [productId]: { quantity } })
  })
  return itemsSerializeds
}

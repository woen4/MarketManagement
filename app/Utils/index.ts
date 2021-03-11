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

export function buidSortOptions(sort: string, validFields: string[]) {
  const [orderBy, direction] = sort.split('+')
  const validField = validFields.includes(orderBy) ? orderBy : validFields[0]

  const sortOptions = {
    orderBy: validField,
    direction: (direction === 'desc' ? 'desc' : 'asc') as 'asc' | 'desc',
  }

  return sortOptions
}

export function Binder() {
  Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map((key) => {
    if (this[key] instanceof Function && key !== 'constructor') this[key] = this[key].bind(this)
  })
}

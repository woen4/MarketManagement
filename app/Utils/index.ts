import Logger from '@ioc:Adonis/Core/Logger'

export function sum(values: object[], key: string) {
  if (!values) {
    Logger.error('The sum function received undefined values')
    return 0
  }
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

export function buildQueryOptions(
  params: IndexParams,
  defaultOrderBy: string,
  defaultDirection: string
) {
  const { sort, page } = params
  const [orderBy, direction] = sort?.split('+') || [defaultOrderBy, defaultDirection]
  const validDirection = direction === ('asc' || 'desc') ? direction : 'asc'

  const queryOptions: QueryOptions = {
    pagination: {
      page: page || 1,
      perPage: 10,
    },
    sort: {
      orderBy,
      direction: validDirection,
    },
  }

  return queryOptions
}

export function Binder() {
  Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map((key) => {
    if (this[key] instanceof Function && key !== 'constructor') this[key] = this[key].bind(this)
  })
}

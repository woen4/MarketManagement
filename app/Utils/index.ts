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

export function buildQueryOptions(
  params: IndexParams,
  defaultOrderBy: string,
  defaultDirection: 'asc' | 'desc'
) {
  const { sort, page } = params
  const [orderBy, direction] = sort?.split('+') || [defaultOrderBy, defaultDirection]

  const queryOptions: QueryOptions = {
    pagination: {
      page: page || 1,
      perPage: 10,
    },
    sort: {
      orderBy,
      direction: validDirection(direction, defaultDirection),
    },
  }

  return queryOptions
}

function validDirection(direction: string, defaultDirection: SortDirection): SortDirection {
  if (direction === 'asc' || direction === 'desc') {
    return direction
  }
  return defaultDirection
}

export function Binder() {
  Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map((key) => {
    if (this[key] instanceof Function && key !== 'constructor') this[key] = this[key].bind(this)
  })
}

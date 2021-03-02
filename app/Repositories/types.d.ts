declare interface RepoCashSale {
  rebate: number
  items: any[]
}

declare interface RepoCreditSale extends RepoCashSale {
  customerId: number
  openAt: DateTime
}

declare interface RepoInventoryInput {
  productId: number
  inputedQuantity: number
  buyPrice: number
  value: number
}

declare interface RepoCustomer {
  name: string
  payable: number
  phoneNumber?: string
  lastPurchase: DateTime
}

declare interface RepoProduct {
  code: string
  name: string
  stock: number
  sellPrice: number
  buyPrice: number
  provider?: string
}
declare interface QueryOptions {
  pagination: {
    page: number
    perPage: number
  }
  sort: {
    orderBy: string
    direction: 'asc' | 'desc'
  }
}

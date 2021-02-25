declare interface CreateProduct {
  code: string
  name: string
  stock: number
  sellPrice: number
  buyPrice: number
  provider?: string
}

declare interface CreateCashSale {
  rebate: number
  items: Array<Item>
}

declare interface CreateCreditSale {
  rebate: number
  items: Array<Item>
  customerId: number
  openAt: DateTime
}

interface CreateCustomer {
  name: string
  payable: number
  phoneNumber: string
  lastPurchase: DateTime
}

declare interface Params {
  id: number
}

declare interface IndexParams {
  page: number
}

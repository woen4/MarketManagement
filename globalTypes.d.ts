declare interface Item {
  quantity: number
  productId: number
}

declare interface CashSaleData {
  id: number
  rebate: number
  items: [
    {
      product: {
        id: number
        code: number
        name: string
        inventory: number
        sellPrice: number
        buyPrice: number
        provider: string | null
      }
      quantity: number
    }
  ]
  rawValue: number
  value: number
}

declare interface CreditSaleData extends CashSaleData {
  customerId: number
  openAt: DateTime
}

declare interface ProductData {
  id: number
  code: string
  name: string
  inventory: number
  sellPrice: number
  buyPrice: number
  provider: string | null
  priceWithTax: number
}

interface CreateInventoryInput {
  product: ProductData
  newProduct: ProductData
}

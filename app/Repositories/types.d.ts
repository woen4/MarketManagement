declare interface RepoCashSale {
  rebate: number
  items: any
}

declare interface RepoCreditSale extends RepoCashSale {
  customerId: number
  openAt: DateTime
}

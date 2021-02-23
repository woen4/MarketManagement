interface ProductCreateData {
  code: string
  name: string
  stock: number
  sellPrice: number
  buyPrice: number
  provider?: string
}

interface ProductUpdateData extends ProductCreateData {
  recordStockChange: boolean
}

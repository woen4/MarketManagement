interface CreateInventoryInput {
  product: { $original: ProductData }
  oldProduct: { $original: ProductData }
}

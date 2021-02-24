import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() public code: string

  @column() public name: string

  @column() public quantity: number

  @column() public sellPrice: number

  @column() public buyPrice: number

  @column() public provider: string

  @computed()
  public get priceWithTax() {
    return this.buyPrice * 1.3
  }
}

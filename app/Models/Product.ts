import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() public code: string

  @column() public name: string

  @column() public inventory: number

  @column({ serializeAs: 'sellPrice' }) public sellPrice: number

  @column({ serializeAs: 'buyPrice' }) public buyPrice: number

  @column() public provider: string

  @computed()
  public get priceWithTax() {
    return this.buyPrice * 1.3
  }
}

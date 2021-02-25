import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany, computed } from '@ioc:Adonis/Lucid/Orm'
import Product from 'App/Models/Product'
import { sum } from 'App/Utils'

export default class CashSale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rebate: number

  @manyToMany(() => Product, {
    pivotColumns: ['quantity'],
  })
  public products: ManyToMany<typeof Product>

  @computed()
  public get rawValue() {
    return sum(this.products, 'sellPrice')
  }

  @computed()
  public get value() {
    return this.rawValue - this.rebate
  }

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime
}

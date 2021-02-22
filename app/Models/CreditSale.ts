import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  column,
  manyToMany,
  ManyToMany,
  BelongsTo,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import Product from 'App/Models/Product'
import Customer from 'App/Models/Customer'
import { sum } from '../utils'

export default class CreditSale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Foreign key
  @column()
  public customerId: number

  @column()
  public rebate: number

  @computed()
  public get rawValue() {
    return sum(this.products, 'sellPrice')
  }

  @computed()
  public get value() {
    return this.rawValue - this.rebate
  }

  @column.dateTime({ autoCreate: true })
  public openAt: DateTime

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>

  @manyToMany(() => Product)
  public products: ManyToMany<typeof Product>
}

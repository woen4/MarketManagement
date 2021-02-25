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
import { sum } from 'App/Utils'

export default class CreditSale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Foreign key
  @column({ serializeAs: 'customerId' })
  public customerId: number

  @column()
  public rebate: number

  @computed()
  public get items() {
    return this.products.map((product) => ({
      product: product.$original,
      quantity: product.$extras.pivot_quantity,
    }))
  }

  @computed()
  public get rawValue() {
    return sum(this.products, 'sellPrice')
  }

  @computed()
  public get value() {
    return this.rawValue - this.rebate
  }

  @column.dateTime({ serializeAs: 'openAt', autoCreate: true })
  public openAt: DateTime

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>

  @manyToMany(() => Product, {
    pivotColumns: ['quantity'],
    serializeAs: '',
  })
  public products: ManyToMany<typeof Product>
}

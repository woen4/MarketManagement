import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
export default class Customer extends BaseModel {
  @beforeSave()
  public static async setLastPurchase(customer: Customer) {
    customer.lastPurchase = DateTime.now()
  }

  @column({ isPrimary: true })
  public id: number

  @column() public name: string

  @column() public payable: number

  @column({ serializeAs: 'phoneNumber' }) public phoneNumber: string

  @column.dateTime({ serializeAs: 'lastPurchase', autoCreate: true }) public lastPurchase: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: '' })
  public updatedAt: DateTime
}

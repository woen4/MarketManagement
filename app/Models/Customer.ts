/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() public name: string

  @column() public payable: number

  @column({ serializeAs: 'phoneNumber' }) public phoneNumber: string

  @column({ serializeAs: 'lastPurchase' }) public lastPurchase: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime
}

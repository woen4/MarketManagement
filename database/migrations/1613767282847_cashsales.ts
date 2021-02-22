import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cashsales extends BaseSchema {
  protected tableName = 'cash_sales'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.float('rebate').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

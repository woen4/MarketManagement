import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Creditsales extends BaseSchema {
  protected tableName = 'credit_sales'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').references('id').inTable('customers').onDelete('CASCADE')
      table.float('rebate').notNullable()
      table.dateTime('open_at').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

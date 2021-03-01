import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CashsalesProducts extends BaseSchema {
  protected tableName = 'cash_sale_product'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('quantity').notNullable()
      table.integer('product_id').references('id').inTable('products').onDelete('CASCADE')
      table.integer('cash_sale_id').references('id').inTable('cash_sales').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

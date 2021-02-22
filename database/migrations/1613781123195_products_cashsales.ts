import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductsCashsales extends BaseSchema {
  protected tableName = 'cash_sale_product'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('quantity').notNullable()
      table.integer('product_id').references('id').inTable('products')
      table.integer('cash_sale_id').references('id').inTable('cash_sales')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

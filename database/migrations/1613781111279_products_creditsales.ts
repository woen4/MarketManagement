import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductsCreditsales extends BaseSchema {
  protected tableName = 'credit_sale_product'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('quantity').notNullable()
      table.integer('product_id').references('id').inTable('products')
      table.integer('credit_sale_id').references('id').inTable('credit_sales').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

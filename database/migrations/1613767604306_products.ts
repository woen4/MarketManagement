import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code').notNullable()
      table.string('name').notNullable()
      table.float('stock').notNullable()
      table.float('sell_price').notNullable()
      table.float('buy_price').notNullable()
      table.string('provider')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

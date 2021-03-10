import ProductModel from 'App/Models/Product'
import CashSalesModel from 'App/Models/CashSale'
import CreditSalesModel from 'App/Models/CreditSale'
import CustomerModel from 'App/Models/Customer'
import InventoryInputs from 'App/Schemas/InventoryInput'

export async function clearDatabase() {
  await CreditSalesModel.query().delete()
  await CashSalesModel.query().delete()
  await ProductModel.query().delete()
  await CustomerModel.query().delete()
  await InventoryInputs.deleteMany()
}

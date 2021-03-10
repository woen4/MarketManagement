import ProductModel from 'App/Models/Product'
import CashSalesModel from 'App/Models/CashSale'
import CreditSalesModel from 'App/Models/CreditSale'
import CustomerModel from 'App/Models/Customer'

export async function clearDatabase() {
  await ProductModel.query().delete()
  await CashSalesModel.query().delete()
  await CreditSalesModel.query().delete()
  await CustomerModel.query().delete()
}
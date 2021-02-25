import CashSale from 'App/Models/CashSale'
import NotFoundException from 'App/Exceptions/NotFoundException'

export default class CashSalesRepository {
  public async create(data: RepoCashSale) {
    const cashsale = new CashSale()
    cashsale.rebate = data.rebate

    await cashsale.save()

    await cashsale.related('products').attach(data.items)
    const result = await cashsale.save()

    return result
  }

  public async index(page: number, perPage: number) {
    const cashsales = await CashSale.query().preload('products').paginate(page, perPage)
    return cashsales
  }

  public async show(id: number) {
    const cashsale = await CashSale.query().preload('products').where({ id }).first()
    if (!cashsale) throw new NotFoundException('cash sale')
    return cashsale
  }

  public async destroy(id: number) {
    const cashsale = await CashSale.query().where({ id }).delete()
    if (!cashsale) throw new NotFoundException('cash sale')
    return cashsale
  }
}

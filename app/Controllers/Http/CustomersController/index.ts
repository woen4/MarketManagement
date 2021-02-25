import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

class CustomersController {
  private customerProperties: string[] = ['name', 'payable', 'phoneNumber', 'lastPurchase']

  public async create({ request }: HttpContextContract) {
    const data: CustomerData = request.only(this.customerProperties)
    const { id } = await Customer.create(data)
    return { ...data, id }
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page') || 1
    const perPage = 10
    const customers = await Customer.query().paginate(page, perPage)
    return customers
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params
    const customer = await Customer.find(id)
    if (!customer) return response.status(404)
    return customer
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const data: CustomerData = request.only(this.customerProperties)
    const customer = await Customer.find(id)
    if (!customer) return response.status(404)
    customer.merge({ ...data })
    await customer.save()
    return response.status(204)
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params
    const customer = await Customer.find(id)
    if (!customer) return response.status(404)
    await customer.delete()
    return response.status(204)
  }

  public static async updatePayable(creditSale: CreditSaleData) {
    const { items, customerId } = creditSale
    const sum = items.reduce(
      (accumulator, { product, quantity }) => accumulator + product.sellPrice * quantity,
      0
    )
    const customer = await Customer.findOrFail(customerId)

    customer.$attributes.payable -= sum
    await customer.save()
  }
}

export default CustomersController

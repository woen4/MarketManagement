import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

class CustomersController {
  private customerProperties: string[] = ['name', 'payable', 'phoneNumber', 'lastPurchase']

  public async create({ request }: HttpContextContract) {
    const data: CustomerData = request.only(this.customerProperties)
    const { id } = await Customer.create({ ...data })
    return { ...data, id }
  }

  public async find() {
    const customers = await Customer.all()
    return customers
  }

  public async index({ params }: HttpContextContract) {
    const { id } = params
    const customer = await Customer.find(id)
    return customer
  }

  public async update({ request }: HttpContextContract) {
    const { id } = request.input('id')
    const data: CustomerData = request.only(this.customerProperties)
    const customer = await Customer.findOrFail(id)
    customer.merge({ ...data })
    await customer.save()
    return customer
  }

  public async delete({ params }: HttpContextContract) {
    const { id } = params
    const customer = await Customer.findOrFail(id)
    await customer.delete()
    return customer
  }
}

export default CustomersController

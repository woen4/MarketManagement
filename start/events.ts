import Event from '@ioc:Adonis/Core/Event'
import InventoryInputsService from 'App/Services/InventoyInputsService'
import ProductsService from 'App/Services/ProductsService'
import CustomersService from 'App/Services/CustomersService'

const productsService = new ProductsService()
const inventoryInputsService = new InventoryInputsService()
const customersService = new CustomersService()

Event.on('new:sale', (...args) => productsService.updateInventory(...args))
Event.on('new:creditsale', (...args) => customersService.updatePayable(...args))
Event.on('update:product', (...args) => inventoryInputsService.create(...args))

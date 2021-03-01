import Event from '@ioc:Adonis/Core/Event'
import InventoryInputsService from 'App/Services/InventoyInputsService'
import ProductsService from 'App/Services/ProductsService'
import CustomerController from 'App/Controllers/Http/CustomersController'

const productsService = new ProductsService()
const inventoryInputsService = new InventoryInputsService()

Event.on('new:sale', (...args) => productsService.updateInventory(...args))
Event.on('new:creditsale', (...args) => CustomerController.updatePayable(...args))
Event.on('update:product', (...args) => inventoryInputsService.create(...args))

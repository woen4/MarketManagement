import Event from '@ioc:Adonis/Core/Event'
import InventoryInputsController from 'App/Controllers/Http/InventoryInputsController'
import ProductsController from 'App/Controllers/Http/ProductsController'
import CustomerController from 'App/Controllers/Http/CustomersController'

Event.on('new:sale', ProductsController.updateStock)
Event.on('new:creditsale', CustomerController.updatePayable)
Event.on('update:product', InventoryInputsController.create)

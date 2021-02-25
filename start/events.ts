import Event from '@ioc:Adonis/Core/Event'
import ProductsController from 'App/Controllers/Http/ProductsController'
import CustomerController from 'App/Controllers/Http/CustomersController'

Event.on('new:sale', ProductsController.updateStock)
Event.on('new:creditsale', CustomerController.updatePayable)

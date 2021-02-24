import Event from '@ioc:Adonis/Core/Event'
import ProductsController from 'App/Controllers/Http/ProductsController'

Event.on('new:sale', ProductsController.updateStock)

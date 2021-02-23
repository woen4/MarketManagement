/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/customers', 'CustomersController.create')
Route.get('/customers', 'CustomersController.index')
Route.get('/customers/:id', 'CustomersController.show')
Route.put('/customers/:id', 'CustomersController.update')
Route.delete('/customers/:id', 'CustomersController.destroy')

Route.post('/cashsales', 'CashSalesController.create')
Route.get('/cashsales', 'CashSalesController.index')
Route.get('/cashsales/:id', 'CashSalesController.show')
//Route.put('/cashsales/:id', 'CashSalesController.update')
Route.delete('/cashsales/:id', 'CashSalesController.destroy')

Route.post('/products', 'ProductsController.create')
Route.get('/products', 'ProductsController.index')
Route.get('/products/:id', 'ProductsController.show')
Route.put('/products/:id', 'ProductsController.update')
Route.delete('/products/:id', 'ProductsController.destroy')

Route.post('/creditsales', 'CreditSalesController.create')
Route.get('/creditsales', 'CreditSalesController.index')
Route.get('/creditsales/:id', 'CreditSalesController.show')
//Route.put('/creditsales/:id', 'CreditSalesController.update')
Route.delete('/creditsales/:id', 'CreditSalesController.destroy')

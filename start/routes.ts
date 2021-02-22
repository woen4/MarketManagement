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
Route.get('/customers', 'CustomersController.find')
Route.get('/customers/:id', 'CustomersController.index').middleware('convertId')
Route.put('/customers/:id', 'CustomersController.update').middleware('convertId')
Route.delete('/customers/:id', 'CustomersController.delete').middleware('convertId')

Route.post('/cashsales', 'CashSalesController.create')
Route.get('/cashsales', 'CashSalesController.find')
Route.get('/cashsales/:id', 'CashSalesController.index')

Route.post('/products', 'ProductsController.create')
Route.get('/products', 'ProductsController.find')

Route.post('/creditsales', 'CreditSalesController.create')

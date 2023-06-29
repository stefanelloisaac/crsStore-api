import controller from '../controllers/ordersController'

export default (app) => {
	app.post('/orders/', controller.persist)
	app.patch('/orders/:id', controller.persist)
	app.delete('/orders/destroy/:id', controller.destroy)
	app.get('/orders/', controller.get)
	app.get('/orders/:id', controller.get)
}
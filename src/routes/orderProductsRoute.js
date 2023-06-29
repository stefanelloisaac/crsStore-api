import controller from '../controllers/orderProductsController'

export default (app) => {
	app.post('/orderProducts/', controller.persist)
	app.patch('/orderProducts/:id', controller.persist)
	app.delete('/orderProducts/destroy/:id', controller.destroy)
	app.get('/orderProducts/', controller.get)
	app.get('/orderProducts/:id', controller.get)
}
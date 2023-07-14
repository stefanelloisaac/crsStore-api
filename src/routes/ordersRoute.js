import controller from '../controllers/ordersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/orders/', Authenticate, controller.persist)
	app.patch('/orders/:id', Authenticate, controller.persist)
	app.delete('/orders/destroy/:id', Authenticate, controller.destroy)
	app.get('/orders/', Authenticate, controller.get)
	app.get('/orders/:id', Authenticate, controller.get)
}
import controller from '../controllers/productsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/products/', Authenticate, controller.persist)
	app.patch('/products/:id', Authenticate, controller.persist)
	app.delete('/products/destroy/:id', Authenticate, controller.destroy)
	app.get('/products/', controller.get)
	app.get('/products/:id', controller.get)
}
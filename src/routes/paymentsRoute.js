import controller from '../controllers/paymentsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/payments/', Authenticate, controller.persist)
	app.patch('/payments/:id', Authenticate, controller.persist)
	app.delete('/payments/destroy/:id', Authenticate, controller.destroy)
	app.get('/payments/', controller.get)
	app.get('/payments/:id', controller.get)
}
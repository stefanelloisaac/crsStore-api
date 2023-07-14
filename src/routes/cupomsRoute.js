import controller from '../controllers/cupomsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/cupoms/', Authenticate, controller.persist)
	app.patch('/cupoms/:id', Authenticate, controller.persist)
	app.delete('/cupoms/destroy/:id', Authenticate, controller.destroy)
	app.get('/cupoms/', Authenticate, controller.get)
	app.get('/cupoms/:id', Authenticate, controller.get)
}
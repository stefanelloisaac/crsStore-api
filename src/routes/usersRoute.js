import controller from '../controllers/usersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
  app.post('/users/remove-item/', controller.removeItem)
	app.post('/users/', controller.persist)
	app.patch('/users/:id', controller.persist)
	app.delete('/users/destroy/:id', controller.destroy)
	app.get('/users/', controller.get)
  app.get('/users/by-token', controller.getByToken)
	app.get('/users/:id', controller.get)
  app.post('/users/login', controller.login)
  app.get('/users/resetCart', controller.resetCart)
  app.post('/users/addtoCart', controller.addtoCart)
}
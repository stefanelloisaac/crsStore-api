import controller from '../controllers/usersController'

export default (app) => {
	app.post('/users/', controller.persist)
	app.patch('/users/:id', controller.persist)
	app.delete('/users/destroy/:id', controller.destroy)
	app.get('/users/', controller.get)
	app.get('/users/:id', controller.get)
}
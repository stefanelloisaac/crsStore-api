import controller from '../controllers/cupomsController'

export default (app) => {
	app.post('/cupoms/', controller.persist)
	app.patch('/cupoms/:id', controller.persist)
	app.delete('/cupoms/destroy/:id', controller.destroy)
	app.get('/cupoms/', controller.get)
	app.get('/cupoms/:id', controller.get)
}
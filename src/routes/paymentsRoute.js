import controller from '../controllers/paymentsController'

export default (app) => {
	app.post('/payments/', controller.persist)
	app.patch('/payments/:id', controller.persist)
	app.delete('/payments/destroy/:id', controller.destroy)
	app.get('/payments/', controller.get)
	app.get('/payments/:id', controller.get)
}
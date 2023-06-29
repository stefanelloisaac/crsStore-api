import controller from '../controllers/categoriesController'

export default (app) => {
	app.post('/categories/', controller.persist)
	app.patch('/categories/:id', controller.persist)
	app.delete('/categories/destroy/:id', controller.destroy)
	app.get('/categories/', controller.get)
	app.get('/categories/:id', controller.get)
}
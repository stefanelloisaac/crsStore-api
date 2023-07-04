import controller from '../controllers/categoriesController'

export default (app) => {
	app.post('/categories/', controller.persist)
	app.patch('/categories/:id', controller.persist)
	app.delete('/categories/destroy/:id', controller.destroy)
	app.get('/categories/', controller.getAll)
  app.get('/categories/get-all-categories', controller.getAllCategories)
	app.get('/categories/:id', controller.getAllCategories)
}
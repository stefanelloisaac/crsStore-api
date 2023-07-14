import controller from '../controllers/categoriesController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/categories/', Authenticate, controller.persist)
	app.patch('/categories/:id', Authenticate, controller.persist)
	app.delete('/categories/destroy/:id', Authenticate, controller.destroy)
	app.get('/categories/', controller.getAll)
  app.get('/categories/get-all-categories', controller.getAllCategories)
	app.get('/categories/:id', controller.getAllCategories)
}
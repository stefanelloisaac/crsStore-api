import controller from '../controllers/addressController'

export default (app) => {
	app.post('/address/', controller.persist)
	app.patch('/address/:id', controller.persist)
	app.delete('/address/destroy:id', controller.destroy)
	app.get('/address/', controller.get)
	app.get('/address/:id', controller.get)
}
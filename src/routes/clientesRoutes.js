const express = require('express');
const routes = express.Router();
const ClientesController = require('../controller/ClientesController');
const authMiddleware = require('../middlewares/authMiddleware')

routes.post('/register', ClientesController.register);
routes.post('/login', ClientesController.login);
routes.get('/:id', authMiddleware, ClientesController.getUserById); 
routes.delete('/:id', authMiddleware, ClientesController.deleteUser);
routes.patch('/edit/:id', authMiddleware,ClientesController.updateUser)

module.exports = routes
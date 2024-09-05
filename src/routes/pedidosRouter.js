const express = require('express');
const router = express.Router();
const PedidoController = require('../controller/PedidoController');

router.post('/', PedidoController.criarPedido);
router.get('/', PedidoController.listarPedidos);
router.get('/:id', PedidoController.detalharPedido);
router.put('/:id', PedidoController.atualizarPedido);
router.delete('/:id', PedidoController.excluirPedido);

module.exports = router;

const express = require('express');
const router = express.Router();
const EnderecoController = require('../controller/EnderecosController');


router.post('/', EnderecoController.criarEndereco);
router.put('/:id', EnderecoController.atualizarEndereco);
router.delete('/:id', EnderecoController.excluirEndereco);
router.get('/cliente/:idCliente', EnderecoController.listarEnderecosPorCliente);

module.exports = router;

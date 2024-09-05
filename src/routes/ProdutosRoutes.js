const express = require('express');
const router = express.Router();
const ProdutoController  = require('../controller/ProdutoController')



router.get('/',ProdutoController.getAllProdutos);
router.get('/:id', ProdutoController.getProdutosByid)
router.post('/',ProdutoController.adicionarProdutos);
router.patch('/edit/:id', ProdutoController.updateProdutoId);

module.exports = router;
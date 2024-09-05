const Produtos = require("../models/Produtos")

class ProdutoController{
    static async adicionarProdutos(req, res) {
        try {
            const { nome, descricao, preco, imagem, estoque} = req.body;

            
            if (!nome || !preco) {
                return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
            }

            // Criação do novo produto
            const novoProduto = await Produtos.create({
                nome,
                descricao,
                preco,
                imagem,
                estoque
            });

            // Resposta de sucesso
            res.status(201).json(novoProduto);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao adicionar o produto.' });
        }
    }

    static async getAllProdutos(req, res){
        try{
            const produtos = await Produtos.findAll();
            res.status(200).json(produtos);

        }catch(error){
            res.status(500).json({ message: 'Erro ao buscar produtos' });
        }

    }



    static async getProdutosByid(req,res){
        try {
            const { id } = req.params;

            // Busca o produto pelo ID
            const produto = await Produtos.findByPk(id);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.status(200).json(produto);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            res.status(500).json({ message: 'Erro ao buscar produto' });
        }
    }

    static async updateProdutoId(req, res){
        try {
            const  produtoId  = req.params.id; 
            const { nome, descricao, preco, image, estoque } = req.body; // 

            const produto = await Produtos.findByPk(produtoId);
            

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

    
            produto.nome = nome !== undefined ? nome : produto.nome;
            produto.descricao = descricao !== undefined ? descricao : produto.descricao;
            produto.preco = preco !== undefined ? preco : produto.preco;
            produto.image = image !== undefined ? image : produto.image;
            produto.estoque = estoque !== undefined ? estoque : produto.estoque;

            // Salva as mudanças no banco de dados
            await produto.save();

            res.status(200).json({ message: 'Produto atualizado com sucesso', produto });
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ message: 'Erro ao atualizar produto' });
        }
    }
    }


module.exports = ProdutoController;


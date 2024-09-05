const Pedido = require('../models/Pedido');
const Cliente = require('../models/Cliente');
const Endereco = require('../models/Endereco');
const Produtos = require('../models/Produtos');

class PedidoController{
    static async criarPedido(req, res) {
        try {
            const { clienteId, produtoId, enderecoId, quantidade, status, total } = req.body;

            const cliente = await Cliente.findByPk(clienteId);
            const endereco = await Endereco.findOne({where: { id: enderecoId, clienteId: clienteId }, // Confirma se o endereço pertence ao cliente
        });
            const produto = await Produtos.findByPk(produtoId);
            if (!cliente || !endereco || !produto) {
                return res.status(404).json({ message: 'Cliente, endereço ou produto não encontrado!' });
            }
            const pedido = await Pedido.create({
                clienteId,
                produtoId,
                enderecoId,
                quantidade,
                status,
                total,
            });
    
            res.status(201).json(pedido);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar o pedido', error });
        }
    }

    static async listarPedidos(req, res){
            try {
                const pedidos = await Pedido.findAll({
                    include: [
                        { model: Cliente, attributes: ['nome', 'email'] },
                        { model: Endereco, attributes: ['rua', 'cidade', 'estado', 'cep'] },
                        { model: Produtos, attributes: ['nome', 'descricao', 'preco'] },
                    ],
                });
        
                res.status(200).json(pedidos);
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);

                res.status(500).json({ message: 'Erro ao buscar pedidos', error });
            }
        };

    static async detalharPedido(req, res){
        const { id } = req.params;

    try {
        const pedido = await Pedido.findByPk(id, {
            include: [
                { model: Cliente, attributes: ['nome', 'email'] },
                { model: Endereco, attributes: ['rua', 'cidade', 'estado', 'cep'] },
                { model: Produtos, attributes: ['nome', 'descricao', 'preco'] },
            ],
        });

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido não encontrado!' });
        }

        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o pedido', error });
    }
    };

    static  async atualizarPedido(req, res){
        const { id } = req.params;
        const { clienteId, produtoId, enderecoId, quantidade, status, total } = req.body;
    
        try {
            const pedido = await Pedido.findByPk(id);
    
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrado!' });
            }
    
            // Atualiza as informações do pedido
            await pedido.update({
                clienteId,
                produtoId,
                enderecoId,
                quantidade,
                status,
                total,
            });
    
            res.status(200).json({ message: 'Pedido atualizado com sucesso!', pedido });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar o pedido', error });
        }
    };

    static async excluirPedido(req, res){
        const { id } = req.params;

        try {
            const pedido = await Pedido.findByPk(id);

            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrado!' });
            }

            // Remove o pedido
            await pedido.destroy();

            res.status(200).json({ message: 'Pedido excluído com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir o pedido', error });
            }
        }
    };




module.exports = PedidoController; 
const Endereco = require('../models/Endereco');

    class EndereçoController{
        static async criarEndereco(req, res) {
    const { clienteId, rua, cidade, estado, cep, complemento } = req.body;

    try {
    const novoEndereco = await Endereco.create({
        clienteId,
        rua,
        cidade,
        estado,
        cep,
        complemento,
    });

    res.status(201).json({ mensagem: 'Endereço criado com sucesso', endereco: novoEndereco });
    } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar endereço', error: error.message });
    }
}

    static async atualizarEndereco(req, res) {
    const { id } = req.params;
    const { rua, cidade, estado, cep, complemento } = req.body;

    try {
        const endereco = await Endereco.findByPk(id);

        if (!endereco) {
        return res.status(404).json({ mensagem: 'Endereço não encontrado' });
        }

        await endereco.update({ rua, cidade, estado, cep, complemento });

        res.status(200).json({ mensagem: 'Endereço atualizado com sucesso', endereco });
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao atualizar endereço', error: error.message });
    }
}

    static async excluirEndereco(req, res) {
    const { id } = req.params;

    try {
        const endereco = await Endereco.findByPk(id);

        if (!endereco) {
        return res.status(404).json({ mensagem: 'Endereço não encontrado' });
        }

        await endereco.destroy();

        res.status(200).json({ mensagem: 'Endereço excluído com sucesso' });
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao excluir endereço', error: error.message });
    }
}

    static async listarEnderecosPorCliente(req, res) {
    const { clienteId } = req.params;

    try {
        const enderecos = await Endereco.findAll({ where: { clienteId } });

        res.status(200).json({ enderecos });
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao listar endereços', error: error.message });
    }
}
};

module.exports = EndereçoController;

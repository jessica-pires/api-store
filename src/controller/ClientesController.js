const Cliente = require('../models/Cliente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createToken = require('../services/createToken')



class ClienteController {
    static async register(req, res){
        try{
            const{ nome, email, telefone, password, confirmpassword} = req.body;

            // Validations
        if (!nome) {
            return res.status(400).json({ message: 'Este campo é obrigatório' });
        }

        if (!email) {
            return res.status(400).json({ message: 'Este campo é obrigatório' });
        }

        if (!telefone) {
            return res.status(400).json({ message: 'Este campo é obrigatório' });
        }

        if (!password) {
            return res.status(400).json({ message: 'A senha é obrigatória.' });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ message: 'As senhas não coincidem.' });
        }
        //checar se usuario ja esta cadastrado
        const userExists = await Cliente.findOne({where: {email : email}})
        if(userExists){
            res.status(400).json({ 
                message: 'Por Favor , utilize outro e-mail!'
            });
            return
        }

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = await   Cliente.create({
            nome,
            email,
            telefone,
            password: passwordHash

        })

        await createToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
        }
    }


    static async login(req,res){
        const {email, password} = req.body;
        if (!email) {
            return res.status(400).json({ message: 'O email é obrigatório.' });
        }

        if (!password) {
            return res.status(400).json({ message: 'A senha é obrigatória.' });
        }

        const user = await Cliente.findOne({where: {email : email}})
        
        //se usuario nao tiver cadastrado 
        if(!user){
            res.status(400).json({ 
                message: 'Não há usuario cadastrado com este e-mail!'
            });
            return
        }

        //checar senhas 
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            res.status(400).json({
                message: 'Senha inválida'
            })
            return
        }

        await createToken(user, req, res);

    }

    static async getUserById(req, res) {
        const { id } = req.params;

        try {
            const user = await Cliente.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter usuário', error: error.message });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const { nome, email, telefone, password, confirmpassword } = req.body;

        if (!nome || !email || !telefone) {
            return res.status(400).json({ message: 'Nome, email e telefone são obrigatórios.' });
        }

        if (password && password !== confirmpassword) {
            return res.status(400).json({ message: 'As senhas não coincidem.' });
        }

        try {
            const user = await Cliente.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }

            user.nome = nome;
            user.email = email;
            user.telefone = telefone;

            await user.save();
            res.status(200).json({ message: 'Atualizado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;

        try {
            const user = await Cliente.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            await user.destroy();
            res.status(200).json({ message: 'Usuário excluído com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
        }
    }

}


module.exports = ClienteController;
const { DataTypes } = require('sequelize');
const database = require('../db/conn');

const Produtos = database.define('Produtos', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {timestamps:true},
)

module.exports = Produtos;
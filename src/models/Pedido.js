const { DataTypes } = require('sequelize');
const database = require('../db/conn');

const Pedido = database.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Deve estar aqui, dentro da definição da coluna
        references: {
            model: 'Produtos',
            key: 'id',
        },
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Deve estar aqui
        references: {
            model: 'Clientes',
            key: 'id',
        },
    },
    enderecoId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Deve estar aqui
        references: {
            model: 'Enderecos',
            key: 'id',
        },
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, { timestamps: true });

module.exports = Pedido;

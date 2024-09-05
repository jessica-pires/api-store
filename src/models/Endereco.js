
const { DataTypes } = require('sequelize');
const database = require('../db/conn');
const Cliente = require('./Cliente');

const Endereco = database.define('Endereco', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    rua: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    cidade: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    estado: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    cep: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    complemento: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Cliente,
        key: 'id',
    },

    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    }
}, {
    tableName: 'Enderecos',
    timestamps: true,
});


module.exports = Endereco;

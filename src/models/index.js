const sequelize = require('../db/conn'); 


const Pedido = require('./Pedido');
const Produtos = require('./Produtos');
const Cliente = require('./Cliente')
const Endereco = require('./Endereco')


// Pedido.belongsToMany(Produtos, { through: PedidoProduto });
// Produtos.belongsToMany(Pedido, { through: PedidoProduto });

Cliente.hasMany(Pedido, { foreignKey: 'clienteId' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });


Endereco.hasMany(Pedido, { foreignKey: 'enderecoId' });
Pedido.belongsTo(Endereco, { foreignKey: 'enderecoId' });

Produtos.hasMany(Pedido, { foreignKey: 'produtoId' });
Pedido.belongsTo(Produtos, { foreignKey: 'produtoId' });

Cliente.hasMany(Endereco, { foreignKey: 'clienteId' });
Endereco.belongsTo(Cliente, { foreignKey: 'clienteId' });


module.exports = {
    sequelize,
    Pedido,
    Produtos,
    Cliente,
    Endereco

};

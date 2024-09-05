const express = require('express');
const cors = require('cors');
const database = require('./src/db/conn')
require('./src/models/index')
const app = express();
const produtoRouter = require('./src/routes/ProdutosRoutes');
const clienteRouter = require('./src/routes/clientesRoutes');
const enderecoRouter = require('./src/routes/enderecoRoutes');
const pedidosRouter = require('./src/routes/pedidosRouter')

app.use(express.json());
app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}));

app.use(express.static('public'));
app.use('/produtos', produtoRouter);
app.use('/usuarios', clienteRouter);
app.use('/enderecos', enderecoRouter);
app.use('/pedidos', pedidosRouter);


const PORT = 3000;
// database.sync({force: false})
database.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => console.log(err));




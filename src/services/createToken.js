const jwt = require('jsonwebtoken');

const createToken = async(user, req, res)=> {
    const token = jwt.sign({id:user.id, email: user.email }, 'nossosecret', { expiresIn: '1h' });
    res.status(200).json({
        message: "Você está autenticado",
        token: token,
    })
}

module.exports = createToken;

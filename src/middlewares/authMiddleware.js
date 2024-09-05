const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, 'nossosecret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userID && req.body.userID !== userId) {
            throw 'invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('invalid request')
        })
    }
};
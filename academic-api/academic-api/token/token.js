const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken(req, res, next){
        if (!req.headers.authorization) 
            return res.status(401).json('No autorizado');
        const token = req.headers.authorization.substr(7);
        if (token!=='') {
            const content = jwt.verify(token, 'llaveParaDesencriptar')
            req.data = content;
            next();
            //console.log(content);
        }else{
            res.status(401).json('Token vacio')
        }
        // console.log(token);
    }  
};


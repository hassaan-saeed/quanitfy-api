module.exports = (req, res, next ) => {
    try{
        const token = req.headers.autherization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch {
        return res.status(401).json({
            message: 'Authentication Failed'
        });
    }
    
};
const roleMiddleware = (...roles)=>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){

            return res.status(403).json({
                success: false,
                message: 'Forbidden, you do not have access to this resource'
            })
        }
        next();
    }
}

module.exports = roleMiddleware;
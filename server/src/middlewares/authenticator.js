import config from '../config';
import Role from '../models/Role';
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if(!token) return res.status(403).json({message: "No token provided"});
        console.log(token);
        
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, {encryptedPassword: 0});
        if (!user) return res.status(404).json({message: "User not found"});
        next()        
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});    
    }
};

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const role = await Role.find({name: user.role});
    if(role.name != "admin") return res.status(401).json({message: 'Unauthorized'});
    next();
};

export const isHolder = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const role = await Role.find({name: user.role});
    if(role.name != "holder") return res.status(401).json({message: 'Unauthorized'});
    next();
};
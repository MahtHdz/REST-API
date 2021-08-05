import Role from '../models/Role';
import User from '../models/User';

export const userExist = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({
        email 
    });
    if (user) return res.status(400).json({
        message: "The user already exists."
    });
    next();
}

export const roleExist = async (req, res, next) => {
    const role = req.body.role;
    const existRole = await Role.findOne({
        name: role
    });
    if (!existRole) {
        return res.status(400).json({
            message: `Role ${role} does not exists.` 
        });
    }    
    next();
}
const authService = require('../services/authService')
module.exports.createUser = async (req,res) => {
    try{
        const {email, password}  =req.body
        const user = await authService.createUser(email, password)
        return res.status(201).json({data: user})
    }catch(e){
        console.log("Error on create user: ", e.message);
        return res.status(400).json({message: "Something is wrong"})
    }
}

module.exports.login = async (req,res) => {
    return res.status(201).json({message: "user created"})
}
const authService = require('../services/authService')
module.exports.createUser = async (req,res) => {
    try{
        const {email, password}  =req.body
        const user = await authService.createUser(email, password)
        return res.status(201).json({message:"We send verification link to your email", data: user})
    }catch(e){
        console.log("Error on create user: ", e.message);
        return res.status(400).json({message: "Something is wrong"})
    }
}

module.exports.confirmUser = async (req, res) =>{
    const {uuid, code} = req.body
    if( !uuid || !code){
        return res.status(400).json({message: "User id or verification code not entered"})
    }
    const checkConfirmation = await authService.userConfirmation(uuid, code)
    return res.status(checkConfirmation.status).json({data:checkConfirmation.data})
}

module.exports.login = async (req,res) => {
    try {
        const {email, password}  =req.body
        const data = await authService.userLogin(email, password)
        if(!data.success){
            return res.status(data.status).json({message: data.message})
        }
    return res.status(201).json({token: data.token})
    } catch (e) {
        console.log("Error on login: ", e.message)
        return res.status(500).json({message: "Something is wrong"})
    }
}

module.exports.verifyToken = async (req,res) => {
    try {
        const {token}  =req.body
        const data = await authService.checkToken(token)
        return res.status(data.status).json({message: data.message})
    } catch (e) {
        console.log("Error on login: ", e.message)
        return res.status(500).json({message: "Something is wrong"})
    }
}

module.exports.resendVerification = async (req,res) => {
    try {
        const {email}  =req.body
        const data = await authService.resendVerificationLink(email)
        return res.status(data.status).json({message: data.message})
    } catch (e) {
        console.log("Error on login: ", e.message)
        return res.status(500).json({message: "Something is wrong"})
    }
}

module.exports.recoveryPassword = async (req,res) => {
    try {
        const {email, password}  =req.body
        const data = await authService.userLogin(email, password)
        if(!data.success){
            return res.status(data.status).json({message: data.message})
        }
    return res.status(201).json({token: data.token})
    } catch (e) {
        console.log("Error on login: ", e.message)
        return res.status(500).json({message: "Something is wrong"})
    }
}
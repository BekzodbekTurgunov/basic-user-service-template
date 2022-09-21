
const createUser = async (req,res) => {
    return res.status(201).json({message: "user created"})
}

const login = async (req,res) => {

}

module.exports = {
    createUser,
    login
}
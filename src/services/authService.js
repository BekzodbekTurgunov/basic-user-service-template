const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (email, password) =>{
    const user = await prisma.user.create({
        data:{
            email,
            password
        }
    })
    return user
}



module.exports = {
    createUser
}
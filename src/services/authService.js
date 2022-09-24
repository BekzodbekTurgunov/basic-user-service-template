const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const helper = require('../helpers/general')
const { mailOptions } = require('../config');
const md5 = require('md5')
const createUser = async (email, password) =>{
    const verificationCode = helper.generateNumbers(4)
    const passwordSecret = process.env.PASSWORD_SECRET
    const codeExpiredAt = new Date(new Date().setDate(new Date().getDate()+1))
    password = md5(`${password}-${passwordSecret}`)
    const verification = await prisma.verification.create({
        data:{
            code: verificationCode.toString(),
            codeExpiredAt
        }
    })
    const user = await prisma.user.create({
        data:{
            email,
            password,
            verificationsId: verification.id
        }
    })
    const verificationLink = `${process.env.SITE_URL}/user?id=${user.id}?code=${verificationCode}`
    await helper.sendMail(mailOptions.userVerificationMailOption(email,verificationLink))
    return user
}
const userConfirmation  = async (uuid, code) =>{
    let userData = await prisma.user.findUnique({
        where: {
            uuid: uuid
        },
        include: {
            verification: true
        }
    })
    if(!userData){
        return {
            success: false,
            status: 404,
            message: "User not found"
        }
    }
    if(userData.verification.code != code.toString()){
        await prisma.verification.update({
            where: {
                id: userData.verification.id
            },
            data: {
                invalid_attempts: userData.verification.invalid_attempts +1
            }
        })
        return {
            status: 400,
            message: "Incorrect verification code"
        }
    }
    else if(userData.verification.code == code.toString()){
        userData = await prisma.user.update({
            where: {
                uuid: uuid
            },
            data: {
                status: "ACTIVE"
            }
        })
        return {
            status:200,
            data: userData,
            message: "User "
        }
    }
}

const userLogin = async(email, password) =>{
    const passwordSecret = process.env.PASSWORD_SECRET
    password = md5(`${password}-${passwordSecret}`)
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return {
            success:false,
            status:404,
            message:"User not found"
        }
    }
    else if(user.status == "UNCONFIRMED" || user.status == "INACTIVE"){
        const message = user.status == "UNCONFIRMED" ? `User is not confirmed, please confirm your accoint` :
        "User is inactive, you can not login your account, please connect or admins"
        return {
            success: false,
            status: 400,
            message
        }
    }
    if(user.password != password){
        return {
            success:false,
            status:400,
            message:"Email or password incorrect"
        }
    }
    const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET, {
        expiresIn: '12h',
      });
      return {
        success:true,
        token
      }
}

const resendVerificationLink = async (email) => {
    const user = await getUserByEmail(email)
    let status = 200;
    let message = ''
    if(!user){
        status = 404
        message = "User not found"
    }
    else if(user.status == "ACTIVE"){
        status = 400
        message = "User account already activated"
    }
    else if(user.status == "INACTIVE"){
        status = 400
        message = "User was suspended"
    }
    else if(user.status == "UNCONFIRMED"){
        const verificationLink = `${process.env.SITE_URL}/user?id=${user.id}?code=${user.verification.code}`
        await helper.sendMail(mailOptions.userVerificationMailOption(email,verificationLink))
            status = 200,
            message = "Verification link successfully send"
    }
    return {
        status,
        message
    }
}

const getUserByEmail = async (email) => {
    const userData = await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            verification:true
        }
    })
    return userData;
}

const checkToken = async(token) => {
//   const token = req.headers.authorization?.split(' ')[1];
const jwtSecret = process.env.JWT_SECRET
  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, jwtSecret);
    const user = await getUserByUuid(jwtPayload.uuid)
    if(!user){
        return {
            status: 401,
            message:"Unathorized user"
        }
    }
    return {
        status: 200,
        message: "Valid token"
    }
  } catch (error) {
    return {
        status:400,
        message: 'Invalid token',
    };
  }
};
const getUserByUuid = async (uuid) => {
    const user = await prisma.user.findUnique({
        where: {
            uuid
        }
    })
    return user
}
module.exports = {
    createUser,
    userConfirmation,
    userLogin,
    resendVerificationLink,
    checkToken
}


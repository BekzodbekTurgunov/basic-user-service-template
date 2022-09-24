const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const checkEmailAvailibility = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
        where: {
            email:req.body.email
        }
  })
  if(user){
    return res.status(409).send({
        message: "This email already registered"
    })
  }
  } catch (error) {
    console.log('Error on auth', error.message);
    res.status(500).send({
      message: 'Something is wrong, please try again later',
    });
    return;
  }

  if (typeof jwtPayload === 'object' && jwtPayload.userId) {
    req.user = { userId: jwtPayload.userId };
  }

  next();
};

module.exports =  checkEmailAvailibility
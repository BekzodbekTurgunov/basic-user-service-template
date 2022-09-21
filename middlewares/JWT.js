const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    console.log('Error on auth', error.message);
    res.status(401).send({
      message: 'Unathorized user',
    });
    return;
  }

  if (typeof jwtPayload === 'object' && jwtPayload.userId) {
    req.user = { userId: jwtPayload.userId };
  }

  next();
};

module.exports =  checkJwt
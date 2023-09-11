const { decodeJWT } = require("../helper/jwt.helper.js");

const authorizationComment = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;
    

    if (!token) throw new Error();

    const data = decodeJWT(token);

    req.user = data;
    
   
    if (data.role!=='admin'&& data.role!=='user'){throw new Error();}

    return next();
  } catch (e) {
    res.sendStatus(401);
  }
};

module.exports = authorizationComment;

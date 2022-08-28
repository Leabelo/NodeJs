const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    

const token = req.header("Authorization");
if (!token) return res.status(400).send("missing token");


try{
const payload = jwt.verify(token, process.env.jwtkey);
req.user = payload;
next();
} catch(error){
res.status(401).send("wrong token")
}
};


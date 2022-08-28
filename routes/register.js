const express = require("express");
 const router = express.Router();
 const{User, validateRegister} = require("../models/User")
 const _ = require("lodash");
 const bcrypt = require("bcrypt");


 router.post("/", async(req, res) => {       
const {error} = validateRegister(req.body);
if (error) return res.status(400).send(error.message);
let user = await User.findOne({email: req.body.email});
if (user) return res.status(400).send("User already exists");

user = new User(req.body);
user.biz = false;

try {
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send(_.pick(user, ["_id", "name", "email"]));
}
catch (error) {
    res.status(400).send(error);
}
 });
 module.exports = router; 
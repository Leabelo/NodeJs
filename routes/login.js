const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { validateLogin, User } = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
const { error } = validateLogin(req.body);
if (error) return res.status(400).send("email and password are not valid");

let user = await User.findOne({ email: req.body.email });
if (!user) return res.status(401).send("User not exists");

const isValid = await bcrypt.compare(req.body.password, user.password);


if (!isValid) return res.status(400).send("wrong password");

res.status(200).json({ token: user.generateToken() })
});

module.exports = router; 
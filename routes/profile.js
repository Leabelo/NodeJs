const express = require("express");
const _ = require("lodash");
const { User } = require("../models/User");
const router = express.Router();
const auth = require("../middleware/auth");


router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).send("User not Exist");

    res.status(200).send(_.pick(user, ["_id", "name", "email", "biz"]));
});

module.exports = router; 
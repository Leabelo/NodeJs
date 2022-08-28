const router = require("express").Router();
const { User } = require("../models/User");
    const auth = require("../middleware/auth");
    const _ = require("lodash");

    router.get("/", auth, async (req, res) => {
try {
    const user = await User.findById(req.user._id).select("-password -__v");
    res.status(200).send(user);
} catch (error) {
    res.status(400).send("no uer found");
}
    });

    module.exports = router;
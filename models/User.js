const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        unique: true, 
        required: true,
        minlength: 5

    }, 
password: {
    type: String, 
    required: true,
    minlength: 8,
    maxlength: 1000, 

},
biz: {
    type: Boolean,
    required: true 
}, 

});

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id, biz: this.biz }, process.env.jwtKey);
    return token;
}

function validateRegister(body){
    const registerRules = Joi.object({
        name: Joi.string().required().min(2),
        email: Joi.string().required().min(5).email(),
        password: Joi.string().required().min(8)
        

    })
    return registerRules.validate(body);
};


function validateLogin(body){
    const registerRules = Joi.object({
        email: Joi.string().required().min(5).email(),
        password: Joi.string().required().min(8).max(1000)
      

    })
    return registerRules.validate(body);
};


const User = mongoose.model("User", userSchema);

module.exports = {User, validateRegister, validateLogin};


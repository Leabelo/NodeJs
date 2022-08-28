const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");



const cardSchema = new mongoose.Schema({
  

    bizName:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    bizDescription: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 300,
    },
    bizAddress: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1000,
    },
    bizPhone: {
        type: String,
        required: true,
        minlength: 9,
        minlength: 10,
    },
    bizImage: {
        type: String,
        required: true,
        minlength: 6,
      
    },
    bizNumber: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",

    }
});

function validateCard(body) {
    const cardRules = Joi.object({
        bizName: Joi.string().required().min(2).max(30),
        bizDescription: Joi.string().required().max(300),
        bizAddress: Joi.string().required().min(2),
        bizPhone: Joi.string()
        .required()
        .min(9)
        .max(10)
        .regex(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/),
        bizImage: Joi.string().required().min(10).max(10000),
    });
    return cardRules.validate(body);
}
const Card = mongoose.model("Card", cardSchema);
 
async function randomBizNumber() {
    while (true) {
        const bizNumber = _.random(1, 10000);
        const card = await Card.exists({ bizNumber: bizNumber });
        if (!card) return bizNumber;
    }
};



module.exports = { Card, validateCard, randomBizNumber };


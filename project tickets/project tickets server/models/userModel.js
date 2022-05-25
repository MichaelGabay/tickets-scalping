const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const { config } = require("../config/secert");


const userSchema = new mongoose.Schema({
    name: String,
    role: {
        type: String,
        default: 'user'
    },
    email: String,
    password: String,
    phone: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    favs_ar: {
        type: Array,
        default: []
    }
})

exports.UserModel = mongoose.model('users', userSchema);

//Create Token of the user
exports.genToken = (_id, role) => { //the function get UserID
    let token = jwt.sign({ _id, role }, `${config.tokenSecret}`, { expiresIn: "600mins" }); //Token properties
    //(jwt.sign({ ID of User }, `SecretWord`, { expiresIn: "Time to expired" }))
    return token; // return the token created
}

exports.validateUser = (_reqBody) => {
        let joiSchema = Joi.object({
            name: Joi.string().min(2).max(99).required(),
            email: Joi.string().min(2).max(150).email().required(),
            password: Joi.string().min(3).max(99).required(),
            phone: Joi.string().min(9).max(99).required()
        })
        return joiSchema.validate(_reqBody)
    }
    // for update user, not allowed to send password
exports.validateEditUser = (_reqBody) => {
        let joiSchema = Joi.object({
            name: Joi.string().min(2).max(99).required(),
            email: Joi.string().min(2).max(150).email().required(),
            phone: Joi.string().min(9).max(99).required(),
            role: Joi.string().min(2).max(99)
        })
        return joiSchema.validate(_reqBody)
    }
    //validation login user
exports.validateLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        email: Joi.string().min(2).max(150).email().required(),
        password: Joi.string().min(3).max(100).required(),
    })
    return joiSchema.validate(_reqBody);
}
const mongoose = require("mongoose");
const Joi = require("joi");

const ticketSchema = new mongoose.Schema({
    name: String,
    info: String,
    img_url: String,
    location: String,
    date_from: String,
    date_to: String,
    price: Number,
    category_short_id: Number,
    user_id: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    link: String,
    short_id: Number,
    status: String,
    time: String,
})

exports.TicketModel = mongoose.model("tickets", ticketSchema);

exports.validateTicket = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        info: Joi.string().min(2).max(500).required(),
        img_url: Joi.string().min(2).max(200).allow("", null),
        location: Joi.string().min(2).max(200).required(),
        link: Joi.string().min(2).max(200).required(),
        date_from: Joi.string().min(2).max(100).required(),
        date_to: Joi.string().min(2).max(100).allow("", null),
        time: Joi.string().min(2).max(100).required(),
        price: Joi.number().min(1).max(999999).required(),
        category_short_id: Joi.string().min(2).max(100).required(),
        link: Joi.string().min(2).max(300).allow("", null),
        status: Joi.string().min(2).max(300).allow("", null),

    })
    return joiSchema.validate(_reqBody)
}
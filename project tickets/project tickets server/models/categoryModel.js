const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
    name: String,
    short_id: String,
    img_url: String,
    url_name: String,
    date_created: {
        type: Date,
        default: Date.now()
    }
})

exports.CategoryModel = mongoose.model('categories', categorySchema);

exports.categoryValidate = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        url_name: Joi.string().min(2).max(99).required(),
        img_url: Joi.string().min(2).max(9999).allow(null, "")
    })
    return joiSchema.validate(_reqBody)
}
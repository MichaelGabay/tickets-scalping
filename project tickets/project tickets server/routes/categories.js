const express = require("express");
const { authAdmin } = require("../middlewares/atuh");
const { CategoryModel, categoryValidate } = require("../models/categoryModel");
const { random } = require('lodash')
const router = express.Router();


router.get('/', async(req, res) => {
    let perPage = req.query.perPage || 30;
    let page = req.query.page || 1;

    try {
        let data = await CategoryModel.find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ _id: -1 })
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'ßhere error try again later' })
    }
})

router.put('/:idEdit', authAdmin, async(req, res) => {
    let validBody = categoryValidate(req.body); //validation the request of Login user
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        let idEdit = req.params.idEdit;
        let data = await CategoryModel.updateOne({ _id: idEdit }, req.body);
        res.json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'ßhere error try again later' })
    }
})

router.delete('/:idDel', authAdmin, async(req, res) => {
    try {
        let idDel = req.params.idDel;
        let data = await CategoryModel.deleteOne({ _id: idDel })
        res.json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: 'There is problem try again later' });
    }

})

router.post('/', authAdmin, async(req, res) => {
    let validBody = categoryValidate(req.body); //validation the request of Login user
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        let category = new CategoryModel(req.body);
        category.short_id = await genShortId();

        await category.save();
        res.status(201).json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: 'There is problem try again later' });
    }

})

router.get('/infoCat/:url_name', async(req, res) => {
    try {
        let url_name = req.params.url_name;
        let cat = await CategoryModel.findOne({ url_name })
        res.json(cat)
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: 'There is problem try again later' });

    }
})

router.post('/categoryName', authAdmin, async(req, res) => {
    try {
        let name = await CategoryModel.findOne({ short_id: req.body.short_id })
        res.json(name.name)
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: 'There is problem try again later' });

    }

})


const genShortId = async() => {
    let flag = true;
    let rnd;
    while (flag) {
        rnd = random(0, 999); // random lodash 0-999
        try {
            let data = await CategoryModel.findOne({ short_id: rnd })
            if (!data) {
                flag = false;
            }
        } catch (err) {
            // throw if catch to Func Use Catch
            throw (err);
        }
    }

    return rnd;

}


module.exports = router;
const express = require("express");
const { random } = require("lodash");
const { auth } = require("../middlewares/atuh");
const { validateTicket, TicketModel } = require("../models/ticketModel");
const { UserModel } = require("../models/userModel");
const router = express.Router();

router.get("/", async(req, res) => {
    let perPage = req.query.perPage || 5;
    let page = req.query.page || 1;
    let cat = req.query.cat;

    try {
        let findFilter = {};
        if (cat) {
            findFilter = { category_short_id: cat };
        }

        let data = await TicketModel.find(findFilter)
            .limit(perPage)
            .skip((page - 1) * perPage)
            // .sort({_id:-1}) like -> order by _id DESC
            .sort({ _id: -1 })
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

router.get("/userTickets", auth, async(req, res) => {
    let perPage = req.query.perPage || 5;
    let page = req.query.page || 1;

    try {

        let data = await TicketModel.find({ user_id: req.tokenData._id })
            .limit(perPage)
            .skip((page - 1) * perPage)
            // .sort({_id:-1}) like -> order by _id DESC
            .sort({ _id: -1 })
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})


router.get('/count', async(req, res) => {
    try {
        // let data = await TicketModel.find({})
        let count = await TicketModel.countDocuments({})
        res.json({ count })

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
});

router.post("/", auth, async(req, res) => {
    let validBody = validateTicket(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let ticket = new TicketModel(req.body);
        ticket.status = "active"
        ticket.user_id = req.tokenData._id
            // short_id,
        ticket.short_id = await genShortId();
        await ticket.save();
        res.status(201).json(ticket)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err_msg: "there problem", err })
    }
});

//search by name,info or location
router.get('/search', async(req, res) => {
    try {
        let searchReg = new RegExp(req.query.s, 'i')
        let data = await TicketModel.find({ $or: [{ name: searchReg }, { info: searchReg }, { location: searchReg }] })
            .limit(20)
            .sort({ _id: -1 })

        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err_msg: "there problem", err })

    }
})

router.get("/ticketsList", async(req, res) => {
    try {
        let shorts_ar = req.query.shorts_ids.split(",");
        // let data = await TicketModel.find({short_id:{$in:["887866","546178"]}})
        let data = await TicketModel.find({ short_id: { $in: shorts_ar } })
            .limit(20)
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})
router.put('/:idEdit', auth, async(req, res) => {
    let idEdit = req.params.idEdit;
    let validBody = validateTicket(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let data;
        //check if the user try to update is admin or not
        if (req.tokenData.role == 'admin') {
            data = await TicketModel.updateOne({ _id: idEdit }, req.body);
        } else {
            data = await TicketModel.updateOne({ _id: idEdit, user_id: req.tokenData._id }, req.body);
        }
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({ err_msg: "there problem", err })
    }


});

router.delete("/:idDel", auth, async(req, res) => {
    let idDel = req.params.idDel
    try {
        let data;
        if (req.tokenData.role == "admin") {
            data = await TicketModel.deleteOne({ _id: idDel });
        } else {
            data = await TicketModel.deleteOne({ _id: idDel, user_id: req.tokenData._id });
        }
        // modifiedCount
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({ err_msg: "there problem", err })
    }
})

router.get('/infoTicket/:idTicket', async(req, res) => {

    try {
        let idTicket = req.params.idTicket
        let ticket = await TicketModel.findOne({ _id: idTicket })

        let userPhone = await UserModel.findOne({ _id: ticket.user_id }, { phone: 1 })
        res.json({ ticket, userPhone })
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: 'There is problem try again later' });

    }
})




// generate shortid for ticket
const genShortId = async() => {
    let flag = true;

    let rnd;
    while (flag) {
        rnd = random(0, 999999); // return num between 0 to 999999
        try {
            let data = await TicketModel.findOne({ short_id: rnd })
            if (!data) {
                flag = false;
            }
        } catch (err) {
            throw (err);
        }
    }
    return rnd;
}

module.exports = router;
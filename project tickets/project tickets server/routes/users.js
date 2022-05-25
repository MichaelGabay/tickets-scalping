const express = require("express");
const bcrypt = require("bcrypt");
const { validateUser, validateLogin, genToken, UserModel, validateEditUser } = require("../models/userModel");
const router = express.Router();
const { auth, authAdmin } = require("../middlewares/atuh"); //import funcs from auth to valid token

router.get("/", (req, res) => {
    res.json({ msg: "Users work " });
})

router.get("/checkToken", auth, async(req, res) => {
    return res.json({ status: "ok", role: req.tokenData.role })
})

router.get("/userInfo", auth, async(req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "There is probelm , try again later", err })

    }
})

// for admin get any user info by id
router.get("/userInfo/:idEdit", authAdmin, async(req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.params.idEdit }, { password: 0 });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "There is probelm , try again later", err })

    }
})

router.get("/listUsers", authAdmin, async(req, res) => {
    try {
        let data = await UserModel.find({}, { password: 0 });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "There is probelm , try again later", err })
    }
})

router.post("/", async(req, res) => {
    let validBody = validateUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        user.password = "*****"
        res.status(201).json(user);
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ code: 11000, err_msg: "Email already in system" })
        }
        return res.status(500).json({ err_msg: "There is probelm , try again later" })

    }
})

router.post("/login", async(req, res) => {
    let validBody = validateLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        // check if there email with this user
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ msg: "User not found !" })
        }
        // check password
        let validPassowrd = await bcrypt.compare(req.body.password, user.password);
        if (!validPassowrd) {
            return res.status(401).json({ msg: "Password worng !" })
        }
        // generate and send token
        let token = genToken(user.id, user.role);
        res.json({ token, user: { name: user.name, role: user.role } });
    } catch (err) {

        res.status(500).json({ err_msg: "There is probelm , try again later" })

    }
})

// just admin can edit another user
router.put("/updateUser/:idEdit", authAdmin, async(req, res) => {
    if (req.params.idEdit == "624988416d1ca02debf9d25f" || req.params.idEdit == req.tokenData._id) {
        return res.status(401).json({ msg_err: "You cant change yourseld or the super admin !!!! " })
    }

    let validBody = validateEditUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let id_edit = req.params.idEdit;
        let data = await UserModel.updateOne({ _id: id_edit }, req.body);
        res.json(data);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(500).json({ err_msg: "Email already in system", code: 11000 })
        }
        res.status(500).json({ err_msg: "There is probelm , try again later" })

    }
})

router.patch("/favs", auth, async(req, res) => {
    try {
        // check if client send in the prop of short_id
        if (req.body.short_id.length > 0 || req.body.short_id > 0) {
            let user = await UserModel.findOne({ _id: req.tokenData._id });
            let favs_ar = user.favs_ar;
            if (favs_ar.includes(req.body.short_id)) {
                // if found delter from array
                favs_ar = favs_ar.filter(short_id => short_id != req.body.short_id)
            } else {
                // if not found add to array
                favs_ar.unshift(req.body.short_id);
                // include max 20 short_id
                favs_ar.splice(20, 99999);
            }
            let data = await UserModel.updateOne({ _id: req.tokenData._id }, { favs_ar })
            res.json(data);
        } else {
            res.status(500).json({ err_msg: "you must send short_id of ticket" })
        }
    } catch (err) {

    }
})

// delete another user by admin
router.delete("/deleteUser/:idDel", authAdmin, async(req, res) => {
    try {

        let idDel = req.params.idDel;
        //cant delete admin@walla.com
        if (idDel == "624988416d1ca02debf9d25f" || idDel == req.tokenData._id) {
            return res.status(401).json({ msg_err: "You cant change yourself or the super admin !!!! " })
        }
        let data = await UserModel.deleteOne({ _id: idDel });
        // "deletedCount": 1
        res.json(data);
    } catch (err) {

        res.status(500).json({ err_msg: "There is probelm , try again later" })
    }
})

module.exports = router;
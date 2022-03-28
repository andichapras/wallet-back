const mongoose = require('mongoose')

const User = require('../models/user-model')

const getAllUser = async (req, res, next) => {
    let user
    try {
        user = await User.find({})
    } catch (error) {
        console.log(error)
        return next(error)
    }

    res.json(user)
}

const getUser = async (req, res, next) => {
    const userId = req.params.userId

    let user
    try {
        user = await User.findById(userId)
    } catch (error) {
        console.log(error)
        return next(error)
    }

    res.json(user)
}

const createUser = async (req, res, next) => {
    const { nama, uang } = req.body

    let uangMuka = 0
    if(uang) {
        uangMuka = uang
    }

    const newUser = new User({
        nama,
        uang: uangMuka,
        transaksi: null,
        modal: false
    })

    try {
        await newUser.save()
    } catch (error) {
        console.log(error)
        return next(error)
    }

    res.json({ user: newUser })
}



exports.getAllUser = getAllUser
exports.getUser = getUser
exports.createUser = createUser

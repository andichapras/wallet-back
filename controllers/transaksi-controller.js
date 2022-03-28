const mongoose = require('mongoose')

const User = require('../models/user-model')

const transferMoney = async (req, res, next) => {
    const { uang, penerima } = req.body
    const userId = req.params.userId

    let user
    try {
        user = await User.findById(userId)
    } catch (error) {
        console.log(error)
        return next(error)
    }

    let userPenerima
    try {
        userPenerima = await User.findById(penerima)
    } catch (error) {
        console.log(error)
        return next(error)
    }

    if(!userPenerima) {
        console.log('Tidak ada id penerima transfer')
        return next(error)
    }

    if( user.saldo > uang ) {
        user.saldo = user.saldo - uang
        const obj = {
            nama: ('Transfer ke ' + userPenerima.nama),
            total: uang
        }
        user.transaksi.unshift(obj)
        userPenerima.saldo = userPenerima.saldo + uang
        
        try {
            const sess = await mongoose.startSession()
            sess.startTransaction()
            await user.save({ session: sess })
            await userPenerima.save({ session: sess })
        } catch (error) {
            console.log(error)
            return next(error)
        }
        res.json({user})

    } else {
        res.json({ message: 'Transaksi gagal' })
    }
}

const topupSaldo = async (req, res, next) => {
    const { uang } = req.body
    const userId = req.params.userId

    let user
    try {
        user = await User.findById(userId)
    } catch (error) {
        console.log(error)
        return next(error)
    }

    user.saldo = user.saldo + uang
    const obj = {
        nama: ('Top up sebesar ' + uang),
        jumlah: uang
    }
    user.transaksi.unshift(obj)

    try {
        await user.save()
    } catch (error) {
        console.log(error)
        return next(error)
    }

    res.json({user})
}

const buySomething = async (req, res, next) => {
    const { uang } = req.body
    const userId = req.params.userId

    let user
    try {
        user = User.findById(userId)
    } catch (error) {
        console.log(error)
        return next(error)
    }

    user.saldo = user.saldo - uang
    const obj = {
        nama: ('Telah membelanjakan sebesar ' + uang),
        jumlah: uang
    }
    user.transaksi.unshift(obj)

    try {
        await user.save()
    } catch (error) {
        console.log(error)
        return next(error)
    }

    res.json({user})
}

exports.transferMoney = transferMoney
exports.topupSaldo = topupSaldo
exports.buySomething = buySomething
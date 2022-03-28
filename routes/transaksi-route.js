const express = require('express')

const transaksiController = require('../controllers/transaksi-controller')

const router = express.Router()

router.patch('/transfer/:userid', transaksiController.transferMoney)

router.patch('/topup.:userid', transaksiController.topupSaldo)

router.patch('/buy/:userid', transaksiController.buySomething)

module.exports = router
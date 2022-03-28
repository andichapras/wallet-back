const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    nama: { type: String, require: true },
    saldo: { type: Number, require: true },
    transaksi: [
        {
            name: { type: String },
            total: { type: Number }
        }
    ],
    modal: { type: Boolean, require: true }
})

module.exports = mongoose.model('User', userSchema)
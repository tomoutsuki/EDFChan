const mongoose = require('mongoose');

const Acc = mongoose.model('Acc', {
    acc_id: Number,
    acc_name: String,
    acc_rarity: String,
    acc_cost: Number,
    acc_description: String,
    acc_url: String
}, 'acc');

module.exports = Acc;
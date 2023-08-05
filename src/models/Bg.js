const mongoose = require('mongoose');

const Bg = mongoose.model('Bg', {
    bg_id: Number,
    bg_name: String,
    bg_rarity: String,
    bg_cost: Number,
    bg_description: String,
    bg_url: String
}, 'bg');

module.exports = Bg;
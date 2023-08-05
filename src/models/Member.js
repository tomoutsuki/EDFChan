const mongoose = require('mongoose');

const Member = mongoose.model('Member', {
    member_id: Number,
    user_id: Number,
    join_date: Date,
    nickname: String,
    level: Number,
    credit: Number,
    affiliation: String,
    salary: Number,
    login_streak: Number,
    xp: Number,
    salary_claimed: String,
    omikuji_played: String,
    bg_id: Number,
    acc_id: Number,
}, 'member');

module.exports = Member;
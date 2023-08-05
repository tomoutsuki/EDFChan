const mongoose = require("mongoose");

module.exports = async (message, result, Member, parameter) => {

    if (typeof parameter === "undefined") {
        message.channel.send("カスタム所属を入力してください！!aff <所属名>");
        return;
    }
    await Member.findOneAndUpdate(
        { //Filter
            user_id: message.author.id
        },
        { //Update
            affiliation: parameter
        });

    message.channel.send("所属の変更に成功しました！");
};

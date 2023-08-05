const mongoose = require('mongoose');
const symbol = "<:edf_coin:1030703934010036254>";

module.exports = async (message, result, Member) => {

    let salary = parseInt(result.salary, 10);
    let current_credit = parseInt(result.credit, 10);

    let streak = parseInt(result.login_streak, 10);
    let new_streak = streak + 1;

    let bonus = Math.ceil((streak + 1) / 3) - 1;
    let bonus_text = ``;

    let new_credit = current_credit + salary + bonus;

    if (result.salary_claimed == "FALSE") {
        if (bonus > 0) bonus_text = `＋${symbol}${bonus}`;

        message.channel.send(
            `${result.nickname}さん、あなたの口座に${symbol}${salary}${bonus_text}が振り込まれました！ (連続${new_streak}日ログイン) `
        );
        await Member.findOneAndUpdate(
            { //Filter
                user_id: message.author.id
            },
            { //Update
                credit: new_credit,
                salary_claimed: "TRUE",
                login_streak: new_streak,
            });
        return;
    }

    message.channel.send(`${result.nickname}さん、日給はもう振り込まれましたよ？`);
};

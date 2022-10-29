const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const symbol = '<:edf_coin:1030703934010036254>';

module.exports = async (event) => {
  let nickname = `${event.member.nick||event.author.username}`;
  
  let member = await lib.googlesheets.query['@0.3.0'].select ({
    range: process.env.GENERAL_DATABASE,
    bounds: `FIRST_EMPTY_ROW`,
    where: [{
      user_id__is: event.author.id
    }]
  });
  let salary = parseInt(member.rows[0].fields.salary, 10);
  let current_credit = parseInt(member.rows[0].fields.credit, 10);
  
  let streak = parseInt(member.rows[0].fields.login_streak, 10);
  let new_streak = streak + 1;
  

  let bonus = Math.ceil((streak+1)/3) - 1;
  let bonus_text = ``;
  
  let new_credit = current_credit + salary + bonus;
  
  if (member.rows[0].fields.salary_claimed == "FALSE") {
    if (bonus > 0) bonus_text = `＋${symbol}${bonus}`;
    
    await SendMessage(`${nickname}さん、あなたの口座に${symbol}${salary}${bonus_text}が振り込まれました！ (連続${new_streak}日ログイン) `);
    await lib.googlesheets.query['@0.3.0'].update({
      range: process.env.GENERAL_DATABASE,
      bounds: 'FIRST_EMPTY_ROW',
      where: [{
        user_id__is: event.author.id
      }],
      fields: {
        credit: new_credit,
        salary_claimed: true,
        login_streak: new_streak
      }
    });
    return;
  }
  
  await SendMessage(`${nickname}さん、日給はもう振り込まれましたよ？`);

  async function SendMessage(sentense) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: event.channel_id,
      content: sentense,
    });
  }
}
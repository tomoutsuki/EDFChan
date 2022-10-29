// APIトークンを照合
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const channel = '880834742059147277';
const event = context.params.event;
let name = `${event.user.username}さん`;
const rawdate = new Date();
const today_date = rawdate.getFullYear() + "-" + 
(rawdate.getMonth() + 1)  + "-" + 
rawdate.getDate();

let message = name + `、EDFユニオンの公式サーバーへようこそ！`;
await lib.discord.channels['@0.0.6'].messages.create({
channel_id: channel,
content: message,
});

await lib.googlesheets.query['@0.3.0'].insert({
  range: database_range,
  fieldsets: [{
    user_id: event.user.id,
    join_date: today_date,
    nickname: name,
    level: 1,
    credit: 5,
    salary: 3,
    login_streak: 0,
    xp: 0,
    salary_claimed: "FALSE",
    omikuji_played: "FALSE",
    bg_id: 0,
    acc_id: 0,
  }]
});
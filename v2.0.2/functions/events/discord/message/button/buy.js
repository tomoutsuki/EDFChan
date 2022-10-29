const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event;

const nickname = `${event.member.nick||event.member.user.username}`;
const symbol = '<:edf_coin:1030703934010036254>';

const rawdate = new Date();
const date = rawdate.getFullYear() + "/" + 
(rawdate.getMonth() + 1)  + "/" + 
rawdate.getDate() + " - " + 
rawdate.getHours() + ":" + 
rawdate.getMinutes() + ":" + 
rawdate.getSeconds();

let rawdata = event.message.content.split('#');
let type = rawdata[0];
let id = rawdata[1];

let member = await lib.googlesheets.query['@0.3.0'].select ({
  range: process.env.GENERAL_DATABASE,
  bounds: `FIRST_EMPTY_ROW`,
  where: [{
    user_id__is: event.member.user.id
  }]
});
let credit = parseInt(member.rows[0].fields.credit, 10);

if (!member.rows[0]) {
  await SendDirectMessage(`おや？どうやらあなたはデータベースに登録されていないようです。管理者にお問い合わせください。`);
  return;
}
let item_name;
let cost;

switch(type) {
  case "bg":
    let bgs = await lib.googlesheets.query['@0.3.0'].select ({
      range: process.env.BG_DATABASE,
      bounds: `FIRST_EMPTY_ROW`,
      where: [{
        bg_id__is: id
      }]
    });
    item_name = bgs.rows[0].fields.bg_name;
    cost = bgs.rows[0].fields.bg_cost;
    break;
    
  case "acc":
    let accs = await lib.googlesheets.query['@0.3.0'].select ({
    range: process.env.ACCESSORY_DATABASE,
    bounds: `FIRST_EMPTY_ROW`,
    where: [{
      acc_id__is: id
    }]
  });
  item_name = accs.rows[0].fields.acc_name;
  cost = accs.rows[0].fields.acc_cost;
  break;
}
if (credit < cost) {
  await SendDirectMessage(`あなたはこのアイテムを買えるクレジットがありません！`);
  return;
}

let bag = await lib.googlesheets.query['@0.3.0'].select ({
  range: process.env.BAG_DATABASE,
  bounds: `FIRST_EMPTY_ROW`,
  where: [{
    user_id__is: event.member.user.id,
    type__is: type,
    id__is: id
  }]
});

if (!bag.rows[0]) {
  let new_credit = credit - cost;
  await RegisterLog(`${date} - [${nickname}] 購入: ${item_name} (-${symbol}${cost})`);
  await SendDirectMessage(`${nickname}さん、${item_name}の購入に成功しました！お買い上げありがとうございます！\n現在の残高： ${symbol}${new_credit}`);
   
  await lib.googlesheets.query['@0.3.0'].update({
    range: process.env.GENERAL_DATABASE,
    bounds: 'FIRST_EMPTY_ROW',
    where: [{
      user_id__is: event.member.user.id
    }],
    fields: {
      credit: new_credit
    }
  });
  
  await lib.googlesheets.query['@0.3.0'].insert({
    range: process.env.BAG_DATABASE,
    fieldsets: [{
      user_id: event.member.user.id,
      type: type,
      id: id,
      amount: "unique",
    }]
  });
  
} else {
  await SendDirectMessage(`あなたはすでにこのアイテムを持ってますよ！`);
  return;
}
  




async function RegisterLog(sentense) {
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: '1031280681344569384',
    content: sentense,
  });
}

async function SendDirectMessage(sentense) {
  lib.discord.users['@0.1.6'].dms.create({
    recipient_id: event.member.user.id,
    content: sentense,
  });
  await sleep(1000);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
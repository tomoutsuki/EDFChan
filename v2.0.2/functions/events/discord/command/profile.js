const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const CanvasProfile = require('../../../../helpers/profile-maker.js');
const event = context.params.event;

if (!event.data.options[0]) {
  await CanvasProfile(event);
  return;
}

const rawdata = event.data.options[0].value.split('#');
let type = rawdata[0];
let id = rawdata[1];

let bag = await lib.googlesheets.query['@0.3.0'].select ({
  range: process.env.BAG_DATABASE,
  bounds: `FIRST_EMPTY_ROW`,
  where: [{
    user_id__is: event.member.user.id,
    type__is: type,
    id__is: id,
  }]
});
if (!bag.rows[0]) {
  SendMessage("申し訳ありません、あなたはこのアイテムを持っていません！");
}

let new_id;
switch(type) {
  case "bg":
    let bgs = await lib.googlesheets.query['@0.3.0'].select ({
      range: process.env.BG_DATABASE,
      bounds: `FIRST_EMPTY_ROW`,
      where: [{
        bg_id__is: id
      }]
    });
    if (!bgs.rows[0]) {
      await SendMessage("申し訳ありません、IDを認識できませんでした！数字をご確認ください。");
      return;
    }
    
    new_id = bgs.rows[0].fields.bg_id;
    break;

  case "acc":
    let accs = await lib.googlesheets.query['@0.3.0'].select ({
      range: process.env.ACCESSORY_DATABASE,
      bounds: `FIRST_EMPTY_ROW`,
      where: [{
        acc_id__is: id
      }]
    });
    if (!accs.rows[0]) {
      await SendMessage("申し訳ありません、IDを認識できませんでした！数字をご確認ください。");
      return;
    }
    
    new_id = accs.rows[0].fields.acc_id;
    break;
    
  default:
    await SendMessage("申し訳ありません、IDを認識できませんでした！背景なら『bg#〇〇』、アクセサリなら『acc#〇〇』という形式かご確認ください！");
    return;
    break;
}

let column_name = type + "_id";
console.log(column_name + "->" + new_id);
await lib.googlesheets.query['@0.3.0'].update({
  range: process.env.GENERAL_DATABASE,
  bounds: 'FIRST_EMPTY_ROW',
  where: [{
    user_id__is: event.member.user.id
  }],
  fields: {
    [column_name]: new_id
  }
});
await SendMessage("変更に成功しました！");


async function SendMessage(sentense) {
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: event.channel_id,
    content: sentense,
  });
}
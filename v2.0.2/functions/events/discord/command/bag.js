const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event;

const nickname = `${event.member.nick||event.member.user.username}`;
const avatar_url = `https://cdn.discordapp.com/avatars/${event.member.user.id}/${event.member.user.avatar}.png`;

const symbol = '<:edf_coin:1030703934010036254>';
const line = '<:vertical:1031684585303576658>';
const common = '<:common:1031932787189624922>';
const rare = '<:rare:1031932784010338388>';
const epic = '<:epic:1031932780029943839>';
const legendary = '<:legendary:1031932782412308581>';

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

let bag = await lib.googlesheets.query['@0.3.0'].select ({
  range: process.env.BAG_DATABASE,
  bounds: `FIRST_EMPTY_ROW`,
  where: [{
    user_id__is: event.member.user.id,
  }]
});

if (!bag.rows[0]) {
  await SendDirectMessage(`おや？どうやらあなたはデータベースに登録されていないようです。管理者にお問い合わせください。`);
  return;
}

let bgs = await lib.googlesheets.query['@0.3.0'].select ({
  range: process.env.BG_DATABASE,
  bounds: `FIRST_EMPTY_ROW`,
});
    
let accs = await lib.googlesheets.query['@0.3.0'].select ({
  range: process.env.ACCESSORY_DATABASE,
  bounds: `FIRST_EMPTY_ROW`,
});

let item_name;
let item_type;
let item_type_japanese;
let item_rarity;
let item_id;
let rarity_emoji;
let bag_content = `${nickname}さんの所有しているアイテムです！\n\n${line}**👜アイテムバッグ**\n\n`;


for (let i = 0; i < bag.rows.length; i++) {
  item_id = bag.rows[i].fields.id;
  item_type = bag.rows[i].fields.type;
  
  switch(item_type) {
    case "bg":
      item_name = bgs.rows[item_id].fields.bg_name;
      item_type_japanese = "背景";
      item_rarity = bgs.rows[item_id].fields.bg_rarity;
      break
      
    case "acc":
      item_name = accs.rows[item_id].fields.acc_name;
      item_type_japanese = "アクセサリー";
      item_rarity = accs.rows[item_id].fields.acc_rarity;
      break;
  }
  console.log(item_rarity);
    switch(item_rarity) {
      case "common":
        rarity_emoji = common;
        break;
      case "rare":
        rarity_emoji = rare;
        break;
      case "epic":
        rarity_emoji = epic;
        break;
      case "legendary":
        rarity_emoji = legendary;
        break;
    }
    bag_content = bag_content + `${rarity_emoji} ${item_name} (ID: ${item_type}#${item_id}) [${item_type_japanese}]\n`;
} 

await lib.discord.channels['@0.1.1'].messages.create({
  channel_id: event.channel_id,
  content: bag_content,
});

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
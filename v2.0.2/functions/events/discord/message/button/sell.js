// APIトークンを照合
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const fs = require('fs');
const event = context.params.event;
const database_range = `A:H`;

//ベース変数の宣言
let nickname = `${event.member.nick||event.member.user.username}`;

//アイテム情報（JSON）をインポート
let rawdata = fs.readFileSync('user_data/items.json');
let items = JSON.parse(rawdata);

//定数のインポート
const symbol = '<:edfcoin_symbol02:905301602892656642>';
let item_id = event.message.content;
let item_price = items.items[item_id].sell_price;
let item_range = items.items.length;


//データベースからアイテム数を取得
let bag_inside = await lib.googlesheets.query['@0.3.0'].distinct ({
  range: `A:H`,
  bounds: `FIRST_EMPTY_ROW`,
  where: [{
    user_id__is: event.member.user.id
  }],
  field: `item`,
});
let database_write = ``;
let item_amount = bag_inside.distinct.values[0].split(',');

//もしまだ登録してないなら
if (!bag_inside.distinct.values[0]) {
  await SendDirectMessage(`おや？あなたはまだ登録をしていないようです！**!register**と入力してみてください！`);

//もしアイテムを持っていれば
} else if (item_amount[item_id] > 0) {
  //残高を確認
  let credit = await GetDatabase('credit');
  
  //データベースに上書きするデータを作成
  for (let i = 0; i < item_range; i++) {
    
    //もしデータベースにその情報が記載されていないなら、0を代用
    if (!item_amount[i]) item_amount[i]=0;
    
      //購入されたアイテムなら、1個追加
    if (i == item_id) {
      database_write += `${parseInt(item_amount[i]) - 1}`;
      
    //違ったらスルー
    } else {
      database_write += `${item_amount[i]}`;
    }
    if (i != item_range - 1) database_write += ',';
  }
  
  await SendMessage(`[${nickname}] 『${items.items[item_id].item_name}』を売りました`);
  await UpdateDatabase('credit', parseInt(credit) + item_price);
  await UpdateDatabase(`item`, database_write);
  
//もしアイテムを買える残高がなければ
} else {
  await SendDirectMessage(`あなたはそのアイテムを持っていないので、売れませんよ！`);
}

//=======================================
//　　　　　　　システム関数 
//=======================================
// メッセージ送信
async function SendMessage(sentense) {
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: '911097755773063208',
    content: sentense,
  });
  
  await sleep(1000);
}

//返信メッセージを送信
async function SendDirectMessage(sentense) {
  lib.discord.users['@0.1.6'].dms.create({
    recipient_id: event.member.user.id,
    content: sentense,
  });
  await sleep(1000);
}

//データベース取得関数
async function GetDatabase(Field) {
  let database = await lib.googlesheets.query['@0.3.0'].distinct({
    range: database_range,
    bounds: `FIRST_EMPTY_ROW`,
    field: Field,
    where: [{
      user_id__is: event.member.user.id
    }],
  });
  return database.distinct.values[0];
}

async function UpdateDatabase(Field, Value) {
  await lib.googlesheets.query['@0.3.0'].update({
    range: database_range,
    bounds: 'FIRST_EMPTY_ROW',
    where: [{
      user_id__is: event.member.user.id
    }],
    fields: {
      [Field]: Value
    }
  });
}

//アカウントが存在するか確認
async function HaveAccount() {
  let findUser = await lib.googlesheets.query['@0.3.0'].select({
    range: `A:B`,
    bounds: 'FIRST_EMPTY_ROW',
    where: [{
        user_id__is: event.member.user.id
    }]
  });
  return findUser.rows.length;
}

//Sleep関数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
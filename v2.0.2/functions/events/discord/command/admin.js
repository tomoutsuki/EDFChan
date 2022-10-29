const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const　Shop = require('../../../../helpers/admin/shop.js');
const　Say = require('../../../../helpers/admin/say.js');
const event = context.params.event;

if (!event.member.permission_names.includes("ADMINISTRATOR")) {
  await SendMessage("申し訳ありません、あなたはこのコマンドを使用するための権限を保有していません。");
  return;
}

const command = context.params.event.data.options[0].value;
switch (command) {
  case "shop":
    await Shop(event);
    break;
  case "say":
    await Say(event);
    break;
}

async function SendMessage(sentense) {
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: event.channel_id,
    content: sentense,
  });
}
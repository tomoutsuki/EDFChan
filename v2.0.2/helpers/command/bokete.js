const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event) => {
  
  var boketeList = [
    `まずいです、母艦が爆発します！
    ボカーン`,
    `見てください司令官！ライトコーン級がこ〜んなに！！！`,
    `ん〜…… 最近ろくに事務所を出てないような……
    そろそろ太陽が見たいよう、です。`
  ];
  
  let boketeChoice = Math.floor(Math.random() * boketeList.length);	
  let boketeSentense = boketeList[boketeChoice];
  
  await SendMessage(boketeSentense);

  async function SendMessage(sentense) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: event.channel_id,
      content: sentense,
    });
  }
}
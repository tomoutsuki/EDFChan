const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event) => {
  
  let utaList = [
    `青い地球を守るため　EDFの出動だ　ひらめけ勝利の稲光　宇宙人ども撃滅だ〜♪`,
    `緑の地球が危ないぞ　EDFの出動だ　地球を守護する戦士達　宇宙人どもやっつけろ〜♪`,
    `宇宙の果てからやってきた　巨大生物倒すため　戦え正義の歩兵隊　地底探検お手の物〜♪`,
    `兵士は敵より少ないぞ　弾薬敵より足りてない　装備も敵より劣ってる　だけど闘志は負けてない〜♪`,
    `昨日は仲間が殺された　今日は家族が殺された　明日は自分が殺される　だけど戦い続けるぞ〜♪`,
    `空軍海軍全滅だ　陸軍壊滅寸前だ　残っているのはここだけだ　ならば俺たちやってやる〜♪`,
    `おととい兄貴が殺された　昨日は恋人殺された　今日は全員殺される　だけど戦いやめないぞ〜♪`,
  ];
  
  let utaChoice = Math.floor(Math.random() * utaList.length);	
  let utaSentense = utaList[utaChoice];
  
  await SendMessage(utaSentense);
  
  async function SendMessage(sentense) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: event.channel_id,
      content: sentense,
    });
  }
}
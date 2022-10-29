const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const fs = require('fs');

module.exports = async (event) => {
  
  const rawShips = fs.readFileSync('data/shipdata.json');
  const Ships = JSON.parse(rawShips);
    
  const omikujiList = [
    `『大吉』`,
    `『中吉』`,
    `『小吉』`,
    `『吉』`,
    `『凶』`
  ];
  let omikujiChoice = Math.floor(Math.random() * omikujiList.length); 
  let omikujiResult = omikujiList[omikujiChoice];
  
  let shipChoice = Math.floor(Math.random() * Ships.ships.length);
  let shipResult = Ships.ships[shipChoice].name;

  let omikujiSentense = [
    `了解！このEDFちゃんが占ってあげましょう！`,
    `えっと…… 今日のあなたの運勢は`+omikujiResult+`！ ラッキーシップは『`+shipResult+`』です！`,
    `あなたはもう引きましたよね？おみくじは一日一回ですよ！`,
    `おみくじを引くには登録が必要です！!**register**と送信してみてください！`,
  ];
  
  let dbvalue = await lib.googlesheets.query['@0.3.0'].distinct({
    range: process.env.GENERAL_DATABASE,
    bounds: `FIRST_EMPTY_ROW`,
    field: `omikuji_played`,
    where: [{
      user_id__is: event.author.id
    }]
  });

  if (dbvalue.distinct.values[0] == 'FALSE') {
    await SendMessage(omikujiSentense[0]);
    sleep(1000);
    await SendMessage(omikujiSentense[1]);
    
    await lib.googlesheets.query['@0.3.0'].update({
      range: process.env.GENERAL_DATABASE,
      bounds: 'FIRST_EMPTY_ROW',
      where: [{
        user_id__is: event.author.id
      }],
      fields: {
        'omikuji_played': true
      }
    });
    
  } else if (dbvalue.distinct.values[0] == 'TRUE') {
    
    await SendMessage(omikujiSentense[2]);
    
  } else {
    await SendMessage(omikujiSentense[3]);
  }

  async function SendMessage(sentense) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: event.channel_id,
      content: sentense,
    });
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
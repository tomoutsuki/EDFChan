const fs = require('fs');
const mongoose = require('mongoose');

module.exports = async (message, result) => {
    const rawShips = fs.readFileSync('./data/shipdata.json');
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
        `えっと…… 今日のあなたの運勢は`+omikujiResult+`！ ラッキーシップは『`+shipResult+`』    です！`,
        `あなたはもう引きましたよね？おみくじは一日一回ですよ！`,
        `おみくじを引くには登録が必要です！!**register**と送信してみてください！`,
    ];

    if (result.omikuji_played == 'FALSE') {
        await message.channel.send(omikujiSentense[0]);
        await sleep(2000);
        await message.channel.send(omikujiSentense[1]);
    }
    /*await lib.googlesheets.query['@0.3.0'].update({
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
  }*/

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
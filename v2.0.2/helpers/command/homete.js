const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event) => {
  
  var hometeList = [
    `、いつも頑張ってて偉いですね！お疲れ様です♪\n(*ฅ́˘ฅ̀*)`,
    `がいてこそのEDFですね♪\n( * ›ω‹ )੭ｸﾞｰ`,
    `、カッコいいと思いますよ、その感じ\n( ੭ˊ꒳​ˋ)੭✧`,
    `、流石ですね！\n(✿´꒳​ˋ)ﾉ°+.*`,
    `のこと、尊敬してますよ！\n( ˘ω˘)n〜✨`,
  ];
  let hometeChoice = Math.floor(Math.random() * hometeList.length);	
  let hometeResult = hometeList[hometeChoice];
  let hometeSentense = `${event.member.nick||event.author.username}さん` + hometeResult;
  
  await SendMessage(hometeSentense);

  async function SendMessage(sentense) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: event.channel_id,
      content: sentense,
    });
  }
}
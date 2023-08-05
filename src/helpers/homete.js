module.exports = async (message, nickname) => {
  
  var hometeList = [
    `、いつも頑張ってて偉いですね！お疲れ様です♪\n(*ฅ́˘ฅ̀*)`,
    `がいてこそのEDFですね♪\n( * ›ω‹ )੭ｸﾞｰ`,
    `、カッコいいと思いますよ、その感じ\n( ੭ˊ꒳​ˋ)੭✧`,
    `、流石ですね！\n(✿´꒳​ˋ)ﾉ°+.*`,
    `のこと、尊敬してますよ！\n( ˘ω˘)n〜✨`,
  ];
  let hometeChoice = Math.floor(Math.random() * hometeList.length);	
  let hometeResult = hometeList[hometeChoice];
  let hometeSentense = `${nickname}さん` + hometeResult;
  
  message.channel.send(hometeSentense);
}
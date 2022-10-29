const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event) => {
  let nickname = `${event.member.nick||event.author.username}`;
  
  var batouList = [
      `${nickname}さんってほんと使えないですね ╮(´-ω-​ˋ)╭ﾔﾚﾔﾚ`,
      `${nickname}さん、ざーこざーこｗ(☞◍˃̶ᗜ˂̶◍)☞`,
      `${nickname}さん、情けないですね〜(๑ó⌓ò๑)`,
      `${nickname}さん、よわよわだ〜♥(´º∀º｀)`,
      `${nickname}さん、だっさ〜♪(〃ω〃)`,
      `${nickname}さん、大人なのによわよわですね〜♪(〃ω〃)`,
  ];
  
  let batouChoice = Math.floor(Math.random() * batouList.length);	
  let batouResult = batouList[batouChoice];
  
  await SendMessage(batouResult);

  async function SendMessage(sentense) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: event.channel_id,
      content: sentense,
    });
  }
}
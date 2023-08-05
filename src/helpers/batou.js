module.exports = async (message, nickname) => {
  
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
  
  message.channel.send(batouResult);
}
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event, name) => {
  let nickname = `${event.member.nick||event.author.username}`;
  if (typeof event.member.user?.id !== 'undefined') {
    user_id   = event.member.user.id;
  } else {
    user_id   = event.author.id;
  }
  
  if (typeof name === 'undefined') {
    await SendMessage("カスタム所属を入力してください！!aff <所属名>");
    return;
  }
  console.log(name);
  
  await lib.googlesheets.query['@0.3.0'].update({
    range: process.env.GENERAL_DATABASE,
    bounds: 'FIRST_EMPTY_ROW',
    where: [{
      user_id__is: user_id
    }],
    fields: {
      affiliation: name
    }
  });
  
  await SendMessage("所属の変更に成功しました！");
  
  async function SendMessage(sentense) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: event.channel_id,
      content: sentense,
    });
  }
}
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event) => {
  // event.member.user.id, event.member.user.avatar
  let user_id;
  let avatar_id;
  let nickname;
  
  if (typeof event.member.user?.id !== 'undefined') {
    user_id   = event.member.user.id;
    avatar_id = event.member.user.avatar;
    nickname  = event.member.nick || event.member.user.username;

  } else {
    user_id   = event.author.id;
    avatar_id = event.author.avatar;
    nickname  = event.member.nick || event.member.user.username;
  }
  
  
  const avatar_url = `https://cdn.discordapp.com/avatars/${user_id}/${avatar_id}.png`;
  const symbol = '<:edf_coin:1030703934010036254>';
  
  let member = await lib.googlesheets.query['@0.3.0'].select ({
    range: process.env.GENERAL_DATABASE,
    bounds: `FIRST_EMPTY_ROW`,
    where: [{
      user_id__is: user_id
    }]
  });
  let credit = parseInt(member.rows[0].fields.credit, 10);
  
  if (!member.rows[0]) {
    await SendDirectMessage(`おや？どうやらあなたはデータベースに登録されていないようです。管理者にお問い合わせください。`);
    return;
  }
  
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: event.channel_id,
    content: ' ',
    embed: {
      type: 'rich',
      title: `❖${nickname}`,
      color: 0x6495ed,
      description: `残高：${symbol}${credit}\nㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
      thumbnail: {
        url: avatar_url,
      },
    },
  });
  
  async function SendDirectMessage(sentense) {
    lib.discord.users['@0.1.6'].dms.create({
      recipient_id: user_id,
      content: sentense,
    });
    await sleep(1000);
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
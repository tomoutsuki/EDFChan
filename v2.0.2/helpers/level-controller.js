const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event) => {
  const avatar_url = `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.png`;
  const nickname = `${event.member.nick||event.author.username}`;
  let current_level, new_level;
  let current_xp, new_xp;
  let current_salary, new_salary;
  let xp_to_levelup;
  let gained_xp = Math.floor(Math.random() * 4) + 6;
  
  let member = await lib.googlesheets.query['@0.3.0'].select ({
    range: process.env.GENERAL_DATABASE,
    bounds: `FIRST_EMPTY_ROW`,
    where: [{
      user_id__is: event.author.id
    }]
  });
  
  current_level = parseInt(member.rows[0].fields.level, 10);
  current_xp = parseInt(member.rows[0].fields.xp, 10);
  current_salary = parseInt(member.rows[0].fields.salary, 10);
  xp_to_levelup = 80 + (current_level * 65);
  
  new_xp = current_xp + gained_xp;
  
  if (new_xp >= xp_to_levelup) {
    new_level = current_level + 1;
    new_xp = 0;
    new_salary = current_salary + 1 + Math.ceil((new_level+1)/3) - 1;
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: event.channel_id,
      content: ' ',
      embed: {
        type: 'rich',
        title: `✨${nickname}さんのレベルが上がりました！`,
        color: 0x6495ed,
        description: `レベル${current_level} ➤ レベル${new_level}\nㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
        thumbnail: {
          url: avatar_url,
        },
      },
    });
    
  } else {
    new_level = current_level;
    new_salary = current_salary;
  }
  
  await lib.googlesheets.query['@0.3.0'].update({
    range: process.env.GENERAL_DATABASE,
    bounds: 'FIRST_EMPTY_ROW',
    where: [{
      user_id__is: event.author.id
    }],
    fields: {
      salary: new_salary,
      level: new_level,
      xp: new_xp
    }
  });
  
  
  
}
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const optionValue = context.params.event.data.options;
const imageURL = optionValue[0].value;
const nickname = `${context.params.event.member.nick||context.params.event.author.username}`;

await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `${nickname}：`,
  embed: {
    type: 'rich',
    color: 0x6495ED,
    image: {
      url: imageURL,
    },
  }
});



// Write some custom code here

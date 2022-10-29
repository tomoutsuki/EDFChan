const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = async (event) => {
  const phrase = event.data.options[1].value;
  await SendMessage(phrase);
  
  async function SendMessage(sentense) {
    await lib.discord.channels['@0.3.2'].messages.create({
      channel_id: event.channel_id,
      content: sentense,
    });
    
    await sleep(1000);
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 
}
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const symbol = '<:edf_coin:1030703934010036254>';
const symbol_name = 'edf_coin';
const symbol_id = '1030703934010036254';

module.exports = async (event) => {
  const type = event.data.options[1].value;
  let option = event.data.options[2].value;

  switch (type) {
    case "bg":
      bgs = await lib.googlesheets.query['@0.3.0'].select ({
        range: process.env.BG_DATABASE,
        bounds: `FIRST_EMPTY_ROW`,
      });
      let bg_name;
      let bg_cost;
      let bg_description;
      
      if (option == 'all') {
        for (let i = 1; i < bgs.rows.length; i++) {
          await sleep(510);

          bg_name = bgs.rows[i].fields.bg_name;
          bg_cost = bgs.rows[i].fields.bg_cost;
          bg_description = bgs.rows[i].fields.bg_description;

          bg_url = bgs.rows[i].fields.bg_url;

          await lib.discord.channels['@0.1.1'].messages.create({
            channel_id: event.channel_id,
            content: `bg#${i}`,
            embed: {
              type: 'rich',
              title: `❖ ${bg_name} ❖\n〘${symbol}${bg_cost}〙`,
              color: 0x6495ed,
              description: `${bg_description}`,
              image: {
                url: bg_url,
              },
            },
            components: [{
              type: 1,
              components: [{
                type: 2,
                style: 3,
                emoji: {
                  id: symbol_id,
                  name: symbol_name,
                  animated: false
                },
                label: `${bg_cost}`,
                custom_id: `buy`
              }]
            }]
          })
        }
      } else if (parseInt(option, 10) < bgs.rows.length) {
        
        option = parseInt(option, 10);
        bg_name = bgs.rows[option].fields.bg_name;
        bg_cost = bgs.rows[option].fields.bg_cost;
        bg_description = bgs.rows[option].fields.bg_description;
        
        bg_url = bgs.rows[option].fields.bg_url;
        
        await lib.discord.channels['@0.1.1'].messages.create({
          channel_id: event.channel_id,
          content: `bg#${option}`,
          embed: {
            type: 'rich',
            title: `❖ ${bg_name} ❖\n〘${symbol}${bg_cost}〙`,
            color: 0x6495ed,
            description: `${bg_description}`,
            image: {
              url: bg_url,
            },
          },
          components: [{
            type: 1,
            components: [{
              type: 2,
              style: 3,
              emoji: {
                id: symbol_id,
                name: symbol_name,
                animated: false
              },
              label: `${bg_cost}`,
              custom_id: `buy`
            }]
          }]
        })
      }
      
      break;
    case "acc":
      accs = await lib.googlesheets.query['@0.3.0'].select ({
        range: process.env.ACCESSORY_DATABASE,
        bounds: `FIRST_EMPTY_ROW`,
      });
      
     let acc_name;
     let acc_cost;
     let acc_description;
     
     if (option == 'all') {
       for (let i = 1; i < accs.rows.length; i++) {
         await sleep(510);
     
         acc_name = accs.rows[i].fields.acc_name;
         acc_cost = accs.rows[i].fields.acc_cost;
         acc_description = accs.rows[i].fields.acc_description;
     
         acc_url = accs.rows[i].fields.acc_url;
     
         await lib.discord.channels['@0.1.1'].messages.create({
           channel_id: event.channel_id,
           content: `acc#${i}`,
           embed: {
             type: 'rich',
             title: `❖ ${acc_name} ❖\n〘${symbol}${acc_cost}〙`,
             color: 0x6495ed,
             description: `${acc_description}`,
             thumbnail: {
               url: acc_url,
             },
           },
           components: [{
             type: 1,
             components: [{
               type: 2,
               style: 3,
               emoji: {
                 id: symbol_id,
                 name: symbol_name,
                 animated: false
               },
               label: `${acc_cost}`,
               custom_id: `buy`
             }]
           }]
         })
       }
     } else if (parseInt(option, 10) < accs.rows.length) {
       
       option = parseInt(option, 10);
       acc_name = accs.rows[option].fields.acc_name;
       acc_cost = accs.rows[option].fields.acc_cost;
       acc_description = accs.rows[option].fields.acc_description;
       
       acc_url = accs.rows[option].fields.acc_url;
       
       await lib.discord.channels['@0.1.1'].messages.create({
         channel_id: event.channel_id,
         content: `acc#${option}`,
         embed: {
           type: 'rich',
           title: `❖ ${acc_name} ❖\n〘${symbol}${acc_cost}〙`,
           color: 0x6495ed,
           description: `${acc_description}`,
           thumbnail: {
             url: acc_url,
           },
         },
         components: [{
           type: 1,
           components: [{
             type: 2,
             style: 3,
             emoji: {
               id: symbol_id,
               name: symbol_name,
               animated: false
             },
             label: `${acc_cost}`,
             custom_id: `buy`
           }]
         }]
       })
     }
      
      
      
      
      
      break;
      
      
      
      
      
      
      
    default:
      SendMessage("その属性は存在しません。");
      break;
  }
  
  let element_name;
  let element_price;
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 
}
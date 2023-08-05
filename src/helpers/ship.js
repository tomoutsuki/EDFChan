const fs = require('fs');
const { EmbedBuilder } = require("discord.js");

const rmetal = `<:rmetal:1072269296346091520>`;
const rcrystal = `<:rcrystal:1072260790230458369>`;
const rdeuterium = `<:rdeuterium:1072260800896569404>`;

//key1 -> ship name,  key2 -> ship submodel
module.exports = async (message, key1, key2) => {
  if (!key1) {
    message.channel.send(`検索しようとしている文字列を入力していません！3文字以上の入力をお願いします。`);
    return;
  }
  if (key1.length < 3) {
    message.channel.send(`検索しようとしている文字列の文字数が足りません！3文字以上の入力をお願いします。`);
    return;
  }
  
  const rawShips = fs.readFileSync('./src/data/shipdata.json');
  const Ships = JSON.parse(rawShips);
  
  let result = [];
  /*let type, name, form, variant, cp;
  let aship, aair, siege, supp, surv, strat;
  let pos, size, max, capacity, jp, speed, wspeed;
  let metal, crystal, deuterium;
  let hour, minute, second;*/
  
  let field = {};
  let scope;
  
  for (let i = 0; i < Ships.ships.length; i++) {
    if (Ships.ships[i].name.includes(key1)) {
      scope = Ships.ships[i];
      field = {
        name: `[` + scope.type + `]   ` + scope.name,
        value: `${scope.variant}: ${scope.type}
        ポジション: ${scope.pos},  MAX ${scope.max}艦
        
        HP:         ${scope.hp}
        Speed:      ${scope.speed}
        Warp Speed: ${scope.wspeed}
        Capacity:   ${scope.capacity}
        
        CP: ${scope.cp}
        対艦 ${scope.aship}   支援 ${scope.supp}
        対空 ${scope.aair}   生存 ${scope.surv}
        攻城 ${scope.siege}   戦術 ${scope.strat}
        
        ${rmetal}${scope.metal}
        ${rcrystal}${scope.crystal}
        ${rdeuterium}${scope.deuterium}
        
        製造時間：${scope.hour}:${scope.minute}:${scope.second}
        
        
        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
        `
      };
      result.push(field);
    }
  }
  
  if (!result[0]) {
    message.channel.send('残念ながら、あなたが指定した条件ではヒットしませんでした……');
    console.log(`Nothing`);
    return;
  }
  const shipEmbed = new EmbedBuilder()
        .setColor(0x6495ed)
        .setTitle(`データベースを一回りしたら、この艦船たちがヒットしました！`)
        .addFields(result);
    message.channel.send({
        content: ' ',
		embeds: [shipEmbed]
    });
}
module.exports = async (message, nickname) => {
  
  var boketeList = [
    `まずいです、母艦が爆発します！
    ボカーン`,
    `見てください司令官！ライトコーン級がこ〜んなに！！！`,
    `ん〜…… 最近ろくに事務所を出てないような……
    そろそろ太陽が見たいよう、です。`
  ];
  
  let boketeChoice = Math.floor(Math.random() * boketeList.length);	
  let boketeSentense = boketeList[boketeChoice];
  
  message.channel.send(boketeSentense);
}
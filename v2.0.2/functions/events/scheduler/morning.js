const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let activitynameslist = [
  `書類を片付け中〜(๑-﹏-๑)ㅤㅤㅤㅤ`,
  `休憩中♪(⑉¯ꇴ¯⑉)❤︎ㅤㅤㅤㅤㅤㅤㅤㅤ`,
  `私掠を掃除中！(°ω°)！ㅤㅤㅤㅤㅤㅤㅤ`,
]

let ActivityChoice = Math.floor(Math.random() * activitynameslist.length);
let activity = activitynameslist[ActivityChoice];

// Do not add some random Things from this part. Discord has limited activity type and status.
// ONLINE, DND, IDLE.
// Activity Type List 
let activitytypelist = [
  `GAME`,
  `LISTENING`,
  `WATCHING`,
  `COMPETING`,
]
let ActypeChoice = Math.floor(Math.random() * activitytypelist.length);
let activitytype = activitytypelist[ActypeChoice];
// End of Activity Type
//Start of status
let status = [
  `ONLINE`,
  `DND`,
  `IDLE`,
]
let statusChoice = Math.floor(Math.random() * status.length);
let statustype = status[statusChoice];

let result = await lib.discord.users['@0.1.1'].me.status.update({
  activity_name: `${activity}`,
  activity_type: `${activitytype}`,
  status: `${statustype}`
});

let sentense1List = [
  `EDFの皆さん、おはようございます！`,
  `司令官の皆様、ごきげんよう！`,
  `グッモーニンッ、EDF！`,
  `おはようです！`,
]
let sentense1Choice = Math.floor(Math.random() * sentense1List.length);
let sentense1 = sentense1List[sentense1Choice];

let sentense2List = [
  `今日もいいことがあるといいですね、良い一日を！`,
  `放射線よし、視界よし、レーダー稼働よし！敵の姿なし！全て順調です！`,
  `昨夜も私掠船が沸いていたので、少し掃除しておきました♪`,
  `データ解析方法にもっと効率のいい整理方法が見つかったので、更新しておきました！`,
  `近くの星系で大規模ガンマ線バーストが発生したため、今日は放射線量が少し高いです。ご注意ください！`,
  `適度な休みもたまには必要です！私が言えたことではないですけどね！`,
  `私ももっと高性能になれば、外交なども請け負えるんですけどねぇ。`,
  `たまには地球にバカンスでも行きたい今日この頃です！`,
  `最近、やたらと猫ちゃんの動画がオススメされるせいで、猫飼いたくなってきちゃいました……`,
]
let sentense2Choice = Math.floor(Math.random() * sentense2List.length);
let sentense2 = sentense2List[sentense2Choice];

let sentense3List = [
  `٩(๑•̀ω•́๑)۶`,
  `o(･ω･｡)`,
  `(｡-ω-)ﾉ`,
  `(｡>ω<)ﾉ`,
  `ヾ(*´∀｀*)ﾉ`,
  `( * ›ω‹ )`,
  `(*∩ω∩)`,
  `٩(ˊᗜˋ*)و”`,
  `(ﾉ*°▽°)ﾉ`,
  `٩(๑>∀<๑)۶`,
  `٩(๑❛ㅂ❛๑)۶`,
  `٩(*ˊ꒳ˋ*)۶`,
]
let sentense3Choice = Math.floor(Math.random() * sentense3List.length);
let sentense3 = sentense3List[sentense3Choice];

await SendMessage(sentense1 + sentense2 + sentense3);

async function SendMessage(sentense) {
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: '906130517819265075',
    content: sentense,
  });
  
  await sleep(1000);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let activitynameslist = [
  `書類を片付け中〜(๑-﹏-๑)ㅤㅤㅤㅤ`,
  `休憩中♪(⑉¯ꇴ¯⑉)❤︎ㅤㅤㅤㅤㅤㅤㅤㅤ`,
  `私掠を掃除中！(°ω°)！ㅤㅤㅤㅤㅤㅤㅤ`,
]

let ActivityChoice = Math.floor(Math.random() * activitynameslist.length);
let activity = activitynameslist[ActivityChoice];

let activitytypelist = [
  `GAME`,
  `LISTENING`,
  `WATCHING`,
  `COMPETING`,
]
let ActypeChoice = Math.floor(Math.random() * activitytypelist.length);
let activitytype = activitytypelist[ActypeChoice];


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
  `EDFの皆さん、こんばんは！`,
  `司令官の皆様、おばんです！`,
  `こんばんは！`,
]
let sentense1Choice = Math.floor(Math.random() * sentense1List.length);
let sentense1 = sentense1List[sentense1Choice];

let lunchList = [
  `菜の花のクリームパスタ`,
  `牛モモ肉のカツレツ`,
  `ベーコンとトマトのパスタ`,
  `ロールポークのトマト煮`,
  `鶏肉と里芋の和風シチュー`,
  `ガーリック風味の鮭ソテー`,
  `夏野菜のカレー炒め`,
  `醤油風味の特大焼き鳥`,
  `メキシカン・ブリート`,
  `秋野菜のチキンスープ`,
  `フィッシュ・アンド・チップス`,
  `ビーフクリームシチュー`,
  `炙りサーモンチーズ寿司`,
  `ヒマラヤ塩ワンポンドステーキ`,
  `ザワークラウト`,
  `ホワイトソーセージラクレット`,
  `バゲット・グリエールチーズフォンデュ`,
  `白菜とササミのたまごスープ`,
  `海の幸パエージャ`,
  `カウド・ヴェールデ`,
  `チキンシュニッツェル`,
  `カツカレー定食`,
  `三色チーズ牛丼温玉付き`,
  `アーリオ・オリオ・ペペロンチーノ`,
  `パルメジアーノ・レッジアーノ・カルボナーラ`,
  `鮭とほうれん草のグラタン`,
  `サンマのおろし煮と里芋スープ`,
  `おろしポン酢の和風ハンバーグ`,
  `シメジのバター醤油炒め`,
  `あじの南蛮漬け`,
  `エビとモッツァレラのマカロニグラタン`,
  `サーモンとほうれん草のクリームリゾット`,
  `さばの竜田揚げ`,
  `ビーフストロガノフのジャガイモ添え`,
  `キエフ風チキンカツレツ`,
  `ラム肉のアイリッシュシチュー`,
  `ブリティッシュブレイクファスト`,
  `えんどう豆のエルテンスープ`,
  `ヒュッツポット`,
  `ムール貝のミディアピラフィ`,
  `羊肉のケバブ`,
]
let lunchChoice = Math.floor(Math.random() * lunchList.length);
let lunch = lunchList[lunchChoice];

let healtyList = [
  `焼きしいたけとアーモンドのサラダ`,
  `卵のロールサンド`,
  `シーザーサラダ`,
  `ハニーマスタード・サラダ`,
  `燻製ハムとゴルゴンゾーラチーズのサラダ`,
  `ベーコンポテトサラダ`,
  `ルッコラ、モッツァレラとトマトのペーストサラダ`,
]
let healtyChoice = Math.floor(Math.random() * healtyList.length);
let healty = healtyList[healtyChoice];

let dessertList = [
  `抹茶ケーキ`,
  `甘酒のミルクゼリー`,
  `エッグタルトと緑茶`,
  `苺のマカロン`,
  `レモンマカロン`,
  `パイナップルマカロン`,
  `ニューヨークチーズケーキ`,
  `アップルパイ`,
  `ミルクトッピングのコーヒーゼリー`,
  `ドセ・ヂ・レイチのチュロス`,
]
let dessertChoice = Math.floor(Math.random() * dessertList.length);
let dessert = dessertList[dessertChoice];

let sentense2List = [
  `今日も一日お疲れ様でした！ゆっくりお休みください！`,
  `お疲れ様です！また明日！`,
  `お疲れ様です！良い睡眠を！`,
  `明日はいい一日だといいですね！！`,
  `今日は私も定時（仮）に帰らせていただきます！では！`,
  `今日も一日が終わりましたね。`+ dessert +`食べたいな〜`,
  `夕飯は`+ lunch +`食べたいな〜`,
  `何か食べようと思ったけど、今日は軽食だけにして、ダイエットに専念です！`,
  `はぁ〜…… やっと終わった。今日は若干ハードワークでした。司令官方もお体には気をつけて！`,
  `やっぱり退勤打刻が一番気持ちいいd ……あっ、なんでもないです！！ゆっくりおやすみください！`,
  `明日のお昼は、EDFレストランで割引の効いてる`+ dessert +`でも食べようかな〜。おやすみなさい！`,
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

await lib.googlesheets.query['@0.3.0'].update({
  range: process.env.GENERAL_DATABASE,
  bounds: 'FIRST_EMPTY_ROW',
  where: [{
    salary_claimed__is: "FALSE"
  }],
  fields: {
    login_streak: 0
  }
});

await lib.googlesheets.query['@0.3.0'].update({
  range: process.env.GENERAL_DATABASE,
  bounds: 'FIRST_EMPTY_ROW',
  fields: {
    salary_claimed: false,
    omikuji_played: false
  }
});

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
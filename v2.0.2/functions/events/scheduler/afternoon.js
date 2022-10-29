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
  `EDFの皆さん、こんにちは！`,
  `お疲れ様です、司令官方！`,
  `グッイーヴニング！、EDF！`,
  `こんにちは！`,
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
  `よいお日和ですね。恒星もこんなに輝いて……あれ？これ、ひょっとしてバーストの予兆？`,
  `放射線よし、視界よし、レーダー稼働よし！敵の姿なし！全て順調です！`,
  `今日もお昼過ぎにかかってまいりました、残業を回避するために頑張るぞー！！`,
  `今日のところはひと段落。自分へのご褒美として`+ dessert +`でも食べましょうかね！`,
  `今日は思い切ってお昼に`+ lunch +`を食べました！すごく美味しかった！`,
  `今日は`+ lunch +`を頼みました！EDFのレストランはなんでもあって大好きです！`,
  `EDFレストランの`+ lunch +`、美味しかったです！`,
  `今回は`+ healty +`をいただきました！たまにはヘルシーなものもいいですね〜`,
  `今日はデザートに`+ dessert +`をいただきました！ほっぺが落ちそうでした……`,
  `今日は味めぐり！`+ lunch +`をお昼ごはん食べました！グルメですねぇ`,
  `今日は少し腸が乱れていたので`+ healty +`をいただきました！すごく美味しかったです！`,
  `本日はメインに`+ lunch +`、デザートに`+ dessert +`をいただきました！ダイエットしないと！`,
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
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const Canvas  = require("canvas");
const Editorc = require("editor-canvas");
const jimp    = require('jimp');
const QRCode  = require('qrcode');

Canvas.registerFont(require('canvas-economica'), {family: 'Economica Regular',});
Canvas.registerFont(require('canvas-hansans'), {family: 'Source Han Sans VF Light',});


const canvas = Canvas.createCanvas(934,282);
const qrc = Canvas.createCanvas(200,200);

const ctx = canvas.getContext('2d');
const qrcctx = qrc.getContext('2d');

module.exports = async (event) => {
  
let user_id;
let avatar_id;

  if (typeof event.member.user?.id !== 'undefined') {
    user_id   = event.member.user.id;
    avatar_id = event.member.user.avatar;
  
  } else {
    user_id   = event.author.id;
    avatar_id = event.author.avatar;
  }
  
  let member = await lib.googlesheets.query['@0.3.0'].select ({
    range: process.env.GENERAL_DATABASE,
    bounds: `FIRST_EMPTY_ROW`,
    where: [{
      user_id__is: user_id
    }]
  });
  
  if (!member.rows[0]) {
    await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: event.channel_id,
      content: `<@!${user_id}>さん,  あなたはアカウントを持っていません！！`,
    });
    return;
  }

  let member_id    = member.rows[0].fields.member_id; 
  let nickname     = member.rows[0].fields.nickname;
  
  let affiliation  = member.rows[0].fields.affiliation ||　`EDF本司令部 司令官`;
  
  let level        = parseInt(member.rows[0].fields.level, 10);
  let credit       = parseInt(member.rows[0].fields.credit, 10);
  let salary       = parseInt(member.rows[0].fields.salary, 10);
  let xp           = parseInt(member.rows[0].fields.xp, 10);
  
  let bg_id        = member.rows[0].fields.bg_id;
  let acc_id       = member.rows[0].fields.acc_id;
  
  let xp_to_levelup = 80 + (level * 65);
  
  let join_date    = new Date(member.rows[0].fields.join_date);
  
  var join_day = join_date.getUTCDate();
  var join_month = join_date.getUTCMonth() + 1;
  var join_year = join_date.getUTCFullYear();
  
  let bgs = await lib.googlesheets.query['@0.3.0'].select ({
    range: process.env.BG_DATABASE,
    bounds: `FIRST_EMPTY_ROW`,
    where: [{
      bg_id__is: bg_id
    }]
  });
  
  let accs = await lib.googlesheets.query['@0.3.0'].select ({
    range: process.env.ACCESSORY_DATABASE,
    bounds: `FIRST_EMPTY_ROW`,
    where: [{
      acc_id__is: acc_id
    }]
  });
  
  if (!bgs.rows[0] || !accs.rows[0]) {
    await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: event.channel_id,
      content: `<@!${user_id}>さん,  原因不明のエラーが発生しました！管理者に問い合わせてください！`,
    });
    return;
  }
  
  const bg_image    = await Canvas.loadImage(bgs.rows[0].fields.bg_url);
  ctx.drawImage(bg_image, 0, 0, canvas.width, canvas.height);
  
  const bg_interface  = await Canvas.loadImage(`https://i.imgur.com/NtqilFO.png`);
    ctx.drawImage(bg_interface, 0, 0, canvas.width, canvas.height);
    
  let avatar = await jimp.read(
    `https://cdn.discordapp.com/avatars/${user_id}/${avatar_id}.png`
  );
  avatar = await avatar.getBufferAsync('image/png');
  avatar = await Editorc.drawCircle({ image: avatar });
  avatar = await Canvas.loadImage(avatar);
  ctx.drawImage(avatar, 60, 60, 130, 130);

  const accessory  = await Canvas.loadImage(accs.rows[0].fields.acc_url);
  ctx.drawImage(accessory, 30, 30, 190, 190);

  let opts = {
    errorCorrectionLevel: 'H',
    margin: 0,
    color: {
      dark:"#b8f2ff",
      light:"#0000"
    }
  }

  QRCode.toCanvas(qrc, member_id, opts, function (error) {});
  ctx.drawImage(qrc, 695, 117, 75, 75);
  
  ctx.globalAlpha = 0.9;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#DBDBDB';
    ctx.font = '28px "Source Han Sans VF Light"';
    ctx.fillText(`▷${nickname}`, 220, 100);
  
    ctx.font = '20px "Source Han Sans VF Light"';
    ctx.fillText(`▶︎${affiliation}`, 220, 132);
    
    ctx.font = '20px "Source Han Sans VF Light"';
    ctx.fillText(`▶︎加入日：${join_year}年${join_month}月${join_day}日`, 220, 200);
    
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  
    ctx.font = '32px "Economica Regular"';
    ctx.fillText(`${level}`, 855, 174);
    
    ctx.globalAlpha = 0.6;
    ctx.font = '18px "Economica Regular"';
    ctx.fillText(`${xp}/${xp_to_levelup}`, 855, 198);
    
   ctx.fillStyle = '#b8f2ff';
    ctx.font = '14px "Economica Regular"';
      ctx.fillText(`EDF${member_id}`, 732, 208);
  
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: event.channel_id,
    content: ``,
    file: await canvas.toBuffer(),
    filename: 'profile.png',
  });
}
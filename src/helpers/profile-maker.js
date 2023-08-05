/*const Canvas    = require("canvas");
const Editorc   = require("editor-canvas");
const jimp      = require("jimp");
const QRCode    = require("qrcode");
const mongoose  = require('mongoose');

const Bg = require('../models/Bg');
const Acc = require('../models/Acc');

Canvas.registerFont(require("canvas-economica"), {
    family: "Economica Regular",
});
Canvas.registerFont(require("canvas-hansans"), {
    family: "Source Han Sans VF Light",
});

const canvas = Canvas.createCanvas(934, 282);
const qrc = Canvas.createCanvas(200, 200);

const ctx = canvas.getContext("2d");
const qrcctx = qrc.getContext("2d");

module.exports = async (message, result, Member) => {
    let user_id = message.author.id;
    let avatar_id = message.author.avatar;

    let member_id = result.member_id;
    let nickname = result.nickname;

    let affiliation = result.affiliation || `EDF本司令部 司令官`;

    let level = parseInt(result.level, 10);
    let credit = parseInt(result.credit, 10);
    let salary = parseInt(result.salary, 10);
    let xp = parseInt(result.xp, 10);

    let bg_id = result.bg_id;
    let acc_id = result.acc_id;

    let xp_to_levelup = 80 + level * 65;

    let join_date = new Date(result.join_date);

    var join_day = join_date.getUTCDate();
    var join_month = join_date.getUTCMonth() + 1;
    var join_year = join_date.getUTCFullYear();

    const bg_result = await Bg.findOne({"bg_id": bg_id});
    const acc_result = await Acc.findOne({"acc_id": acc_id});

    if (!bg_result || !acc_result) {
        message.channel.send(`<@!${user_id}>さん,  原因不明のエラーが発生しました！管理者に問い合わせてください！`);
        return;
    }

    const bg_image = await Canvas.loadImage(bg_result.bg_url);
    ctx.drawImage(bg_image, 0, 0, canvas.width, canvas.height);

    const bg_interface = await Canvas.loadImage(
        `https://i.imgur.com/NtqilFO.png`
    );
    ctx.drawImage(bg_interface, 0, 0, canvas.width, canvas.height);

    let avatar = await jimp.read(
        `https://cdn.discordapp.com/avatars/${user_id}/${avatar_id}.png`
    );
    avatar = await avatar.getBufferAsync("image/png");
    avatar = await Editorc.drawCircle({ image: avatar });
    avatar = await Canvas.loadImage(avatar);
    ctx.drawImage(avatar, 60, 60, 130, 130);

    const accessory = await Canvas.loadImage(acc_result.acc_url);
    ctx.drawImage(accessory, 30, 30, 190, 190);

    let opts = {
        errorCorrectionLevel: "H",
        margin: 0,
        color: {
            dark: "#b8f2ff",
            light: "#0000",
        },
    };

    QRCode.toCanvas(qrc, member_id, opts, function (error) {});
    ctx.drawImage(qrc, 695, 117, 75, 75);

    ctx.globalAlpha = 0.9;
    ctx.textAlign = "left";
    ctx.fillStyle = "#DBDBDB";
    ctx.font = '28px "Source Han Sans VF Light"';
    ctx.fillText(`▷${nickname}`, 220, 100);

    ctx.font = '20px "Source Han Sans VF Light"';
    ctx.fillText(`▶︎${affiliation}`, 220, 132);

    ctx.font = '20px "Source Han Sans VF Light"';
    ctx.fillText(
        `▶︎加入日：${join_year}年${join_month}月${join_day}日`,
        220,
        200
    );

    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";

    ctx.font = '32px "Economica Regular"';
    ctx.fillText(`${level}`, 855, 174);

    ctx.globalAlpha = 0.6;
    ctx.font = '18px "Economica Regular"';
    ctx.fillText(`${xp}/${xp_to_levelup}`, 855, 198);

    ctx.fillStyle = "#b8f2ff";
    ctx.font = '14px "Economica Regular"';
    ctx.fillText(`EDF${member_id}`, 732, 208);

    message.channel.send({
        content: ' ',
        file: await canvas.toBuffer(),
        filename: "profile.png",
    });
};
*/
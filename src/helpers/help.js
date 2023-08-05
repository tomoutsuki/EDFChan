const { EmbedBuilder } = require("discord.js");

module.exports = async (message) => {
    const title_image_url = `https://i.imgur.com/qIepjrS.png`;
    const profile_image_url = `https://i.imgur.com/B2fbvMW.png`;
    const leveling_image_url = `https://i.imgur.com/6bqjPd3.png`;
    const credit_image_url = `https://i.imgur.com/ADMp5EF.png`;
    const service_image_url = `https://i.imgur.com/f48rjLK.png`;

    const credit_thumbnail_url = `https://i.imgur.com/m2zeclx.png`;
    const leveling_thumbnail_url = `https://i.imgur.com/pCHLyDc.png`;
    const profile_thumbnail_url = `https://i.imgur.com/i2BIMl3.png`;
    const service_thumbnail_url = `https://i.imgur.com/in7Uq9k.png`;

    const profile_text = `EDFちゃん1周年記念にEDFちゃんが新たに習得した機能です。
  各司令官はプロフィールカードを持っており、EDFクレジットで購入した背景やアクセサリを利用してカスタマイズができます。`;

    const leveling_text = `レベリング・システムは、司令官方のアクティブ度、貢献度を表す一つのパラメータです。
  EDFサーバー内でチャットしたり、コマンドを使用すると経験値が貯まります。`;

    const credit_text = `EDFクレジットはEDFユニオン間で流通する通貨です。日々、日給を回収することができ、連続で回収すると、ログインボーナスが発生します。
  EDFクレジットを使うことで、プロフィールカードをカスタマイズするアイテムを買えます。`;

    const service_text = `EDFちゃんが提供しているサービス一覧です。`;
    message.channel.send(title_image_url);

    await sleep(640);
    message.channel.send(profile_image_url);

    await sleep(640);
    const helpEmbed1 = new EmbedBuilder()
        .setColor(0x00FFFF)
        .setTitle(` `)
        .setDescription(profile_text)
        .setThumbnail(profile_thumbnail_url)
        .addFields(
            {
                name: `/profile`,
                value: `あなたのプロフィールカードを生成し、レベルなどを確認できます！`,
                inline: true
            },
            {
                name: `/profile [id]`,
                value: `持っている背景やアクセサリーをつけるためのコマンドです！（例：/profile bg#1）`,
                inline: true
            }
        );
    message.channel.send({
        content: ' ',
		embeds: [helpEmbed1]
    });

    await sleep(640);
    message.channel.send(leveling_image_url);

    await sleep(640);
    const helpEmbed2 = new EmbedBuilder()
        .setColor(0x6495ed)
        .setTitle(` `)
        .setDescription(leveling_text)
        .setThumbnail(leveling_thumbnail_url)
        .addFields(
            {
                name: `/profile`,
                value: `あなたのプロフィールカードを生成し、レベルなどを確認できます！`,
                inline: true
            },
            {
                name: `/profile [id]`,
                value: `持っている背景やアクセサリーをつけるためのコマンドです！（例：/profile bg#1）`,
                inline: true
            }
        );
    message.channel.send({
        content: ' ',
		embeds: [helpEmbed2]
    });

    await sleep(640);
    message.channel.send(credit_image_url);

    await sleep(640);
    const helpEmbed3 = new EmbedBuilder()
        .setColor(0x6495ed)
        .setTitle(` `)
        .setDescription(credit_text)
        .setThumbnail(credit_thumbnail_url)
        .addFields(
            {
                name: `/balance`,
                value: `あなたの残高を確認できます。`,
            },
            {
                name: `!daily`,
                value: `日給を受け取ります。レベルが上がったり、毎日受け取ることで、収入が高くなっていきます。`,
            },
        );
    message.channel.send({
        content: ' ',
		embeds: [helpEmbed3]
    });

    await sleep(640);
    message.channel.send(service_image_url);

    await sleep(640);
    const helpEmbed4 = new EmbedBuilder()
        .setColor(0x6495ed)
        .setTitle(` `)
        .setDescription(service_text)
        .setThumbnail(service_thumbnail_url)
        .addFields(
            {
                name: `!omikuji`,
                value: `EDFちゃんがおみくじを引きます。ついでに今日のラッキーシップも教えてくれます。\n一日一回です！＼( 'ω')／ｳｵｰ`,
            },
            {
                name: `!homete`,
                value: `EDFちゃんがあなたを褒めてあげます♪\n･:*+.\(( °ω° ))/.:+`,
            },
            {
                name: `!batou`,
                value: `EDFちゃんがあなたを罵ってあげます\nｶｧｰ(//°ꈊ°//)ー...`,
            },
            {
                name: `!edf`,
                value: `様々なEDFのアスキーアートをランダムに送ります`,
            },
            {
                name: `!bokete`,
                value: `EDFちゃんがボケます\nﾎﾟﾜｰ(*⁰▿⁰*)ーﾝ\nㅤ`,
            },
            {
                name: `!trivia`,
                value: `EDFちゃんが意外なトリビアを投げます！知ってるかなー？\n( ・∇・)？`,
            },
            {
                name: `!uta`,
                value: `EDFちゃんがEDFの歌を熱唱します。さぁ、みんなも一緒に？\n｡.:*･'(*ﾟ▽ﾟ*)'･*:.｡. .`,
            }
        );
    message.channel.send({
        content: ' ',
		embeds: [helpEmbed4]
    });

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};

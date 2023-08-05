const { EmbedBuilder } = require('discord.js');

module.exports = async (message, result) => {
    let user_id;
    let avatar_id;
    let nickname;

    user_id = message.author.id;
    avatar_id = message.author.avatar;
    nickname = result.nickname;

    const avatar_url = `https://cdn.discordapp.com/avatars/${user_id}/${avatar_id}.png`;
    const symbol = "<:edf_coin:1030703934010036254>";

    let credit = parseInt(result.credit, 10);

	const balanceEmbed = new EmbedBuilder()
		.setColor(0x6495ED) 
        .setTitle(`❖${result.nickname}`)
		.setDescription(`残高：${symbol}${credit}\n                    `)
		.setThumbnail(avatar_url);

	message.channel.send({
		content: '',
		embeds: [balanceEmbed]
	});
};

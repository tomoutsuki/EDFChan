module.exports = async (message) => {
    let edfList = [
        `.
        ███████╗
        ██╔════╝
        █████╗
        ██╔══╝
        ███████╗
        ╚══════╝
        ██████╗
        ██╔══██╗
        ██║　　██║
        ██║　　██║
        ██████╔╝
        ╚═════╝
        ███████╗
        ██╔════╝
        █████╗
        ██╔══╝
        ██║
        ╚═╝
        ██╗
        ██║
        ██║
        ╚═╝
        ██╗
        ╚═╝`,
        `┏━━━┳━━━┳━━━┓
        ┃┏━━┻┓┏┓┃┏━━┛
        ┃┗━━┓┃┃┃┃┗━━┓
        ┃┏━━┛┃┃┃┃┏━━┛
        ┃┗━━┳┛┗┛┃┃
        ┗━━━┻━━━┻┛`,
        `ᴱᴰᶠ`,
        `Ë́͠D͊͑͑F͑̚͠`,
        `𝙴𝙳𝙵`,
        `ᕮᗪԲ`,
        `ᖵᗡƎ`,
        `╱╱╱╱╱╭╮╭━╮
        ╱╱╱╱╱┃┃┃╭╯
        ╭━━┳━╯┣╯╰╮
        ┃┃━┫╭╮┣╮╭╯
        ┃┃━┫╰╯┃┃┃
        ╰━━┻━━╯╰╯`,
    ];

    let edfChoice = Math.floor(Math.random() * edfList.length);
    message.channel.send(edfList[edfChoice]);
};

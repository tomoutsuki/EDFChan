require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');

const Omikuji = require('./helpers/omikuji.js');
const Profile = require('./helpers/profile-maker.js');
const Balance = require('./helpers/balance.js');
const Trivia  = require('./helpers/trivia.js');
const Batou   = require('./helpers/batou.js');
const Homete  = require('./helpers/homete.js');
const Bokete  = require('./helpers/bokete.js');
const Daily   = require('./helpers/daily.js');
const Help    = require('./helpers/help.js');
const Ship    = require('./helpers/ship.js')
const Aff     = require('./helpers/aff.js');
const Edf     = require('./helpers/edf.js');
const Uta     = require('./helpers/uta.js');

const Member = require('./models/Member');

const {Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
        for (const file of functionFiles)
            require(`./functions/${folder}/${file}`)(client);
            
}

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch((error) => console.error(error));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('!')) return;

    const [command, ...args] = message.content.substring(1).split(' ');
    
    const result = await Member.findOne({user_id: message.author.id});
    console.log(result.nickname, "used the command", command, ".");

    if (!result) message.channel.send('申し訳ありません、あなたはまだ登録をしていないようです！');

    const nickname = result.nickname;
    // Command format:
    // !<command> <args[0]> <args[1]> ...


    switch (command.toUpperCase()) {
        case "OMIKUJI":
            await Omikuji(message, result);
            break;
        case "HOMETE":
            await Homete(message, nickname);
            break;
        case "BOKETE":
            await Bokete(message, nickname);
            break;
        case "BATOU":
            await Batou(message, nickname);
            break;
        case "EDF":
            await Edf(message);
            break;
        case "UTA":
            await Uta(message);
            break;
        case "TRIVIA":
            await Trivia(message);
            break;
        case "HERUPU":
            await Help(message);
            break;
        case "DAILY":
            await Daily(message, result, Member);
            break;
        case "PROFILE":
            await Profile(message,result, Member);
            break;
        case "BALANCE":
        case "BAL":
            await Balance(message, result);
            break;
        case "AFF":
            await Aff(message, result, Member, args[0]);
            break;
        case "SHIP":
            await Ship(message, args[0], args[1]);
            break;
        case "TEST":
            try {
                const result = await Member.find({member_id: 314159});
                console.log(result);
            } catch (error) {
                console.error(error);
            }
            
            break;
        default:
            break;
    }
    
    if (message.content === 'ping') {
        message.reply({
            content: 'Pong!'
        });
    }
});

client.handleEvents();
client.handleCommands();

client.login(process.env.BOT_TOKEN);
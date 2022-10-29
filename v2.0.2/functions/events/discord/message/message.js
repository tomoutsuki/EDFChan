const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const LevelController = require('../../../../helpers/level-controller.js');
const Balance  = require('../../../../helpers/command/balance.js');
const Omikuji  = require('../../../../helpers/command/omikuji.js');
const Homete   = require('../../../../helpers/command/homete.js');
const Bokete   = require('../../../../helpers/command/bokete.js');
const Trivia   = require('../../../../helpers/command/trivia.js');
const Batou    = require('../../../../helpers/command/batou.js');
const Daily    = require('../../../../helpers/command/daily.js');
const Help     = require('../../../../helpers/command/help.js');
const Edf      = require('../../../../helpers/command/edf.js');
const Uta      = require('../../../../helpers/command/uta.js');
const Aff      = require('../../../../helpers/command/aff.js');

const Profile  = require('../../../../helpers/profile-maker.js');

const event = context.params.event;

let original_cmd = context.params.event.content.toUpperCase();
let cmd = original_cmd.split(' ');

switch (cmd[0]) {
  case "!OMIKUJI":
    await Omikuji(event);
    break;
  case "!HOMETE":
    await Homete(event);
    break;
  case "!BOKETE":
    await Bokete(event);
    break;
  case "!BATOU":
    await Batou(event);
    break;
  case "!EDF":
    await Edf(event);
    break;
  case "!UTA":
    await Uta(event);
    break;
  case "!TRIVIA":
    await Trivia(event);
    break;
  case "!HERUPU":
    await Help(event);
    break;
  case "!DAILY":
    await Daily(event);
    break;
  case "!PROFILE":
    await Profile(event);
    break;
  case "!BALANCE":
  case "!BAL":
    await Balance(event);
    break;
  case "!AFF":
    await Aff(event, cmd[1]);
    break;
}

await LevelController(event);

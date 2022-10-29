const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event;
const Balance = require('../../../../helpers/command/balance.js');

await Balance(event);
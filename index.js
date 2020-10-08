// discord init
const Discord = require('discord.js');
const client = new Discord.Client();

// market module
const { Market } = require('./modules/market');
const marketModule = new Market;

// end file reader
require('dotenv').config();

client.once('ready', () => {
	console.log('Ready!');
}); 

client.on('message', message => {
    const allowedChannels = process.env.ALLOWED_CHANNELS.split(',');

    if (!allowedChannels.find(el => el === message.channel.name)) return;

    if (message.author.bot) return;

    if (!message.content.startsWith(process.env.PREFIX)) return;

    const commandBody = message.content.slice(process.env.PREFIX.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    console.log(args);
 
    // market module
    marketModule.process(command, args, message);
});

client.login(process.env.TOKEN);
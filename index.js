const Discord = require('discord.js');

const client = new Discord.Client();
const dotenv = require('dotenv');

dotenv.config();

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

client.login(token);

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  const modiferValue = parseInt(args[0], 10);

  if (command === 'age' && modiferValue) {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const dragon = Math.floor(Math.random() * 6) + 1;
    const roll = [d1, d2, dragon];

    const checkForDoubles = roll.reduce((obj, item) => {
      if (!obj[item]) {
        obj[item] = 0;
      }
      obj[item]++;
      return obj;
    }, {});

    const color = Object.keys(checkForDoubles).length <= 2 ? '#ff0000' : '#00b0f4';
    const text = Object.keys(checkForDoubles).length <= 2 ? `You rolled **${d1 + d2 + dragon + modiferValue}**\nDoubles! Gain ${dragon} stunt points!` : `You rolled **${d1 + d2 + dragon + modiferValue}**`;

    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(text)
      .setDescription(`\`(${d1} + ${d2}) + (Dragon Die: ${dragon}) + ${modiferValue} = ${d1 + d2 + dragon + modiferValue}\``)
      .setTimestamp()
      .setFooter('May the dice be ever in your favor');

    message.channel.send(embed);
  } else {
    const errorReply = `Error: make sure you are using a number. Ex: \`${prefix}age 2\`, \`${prefix}age 2\` or \`${prefix}age -1\``;
    message.channel.send(errorReply);
  }
});
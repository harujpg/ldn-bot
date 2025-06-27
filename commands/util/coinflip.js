const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Jogue cara ou coroa!'),
  async execute(interaction) {
    const resultado = Math.random() < 0.5 ? '🪙 **Cara!**' : '🪙 **Coroa!**';
    await interaction.reply(resultado);
  }
}; 
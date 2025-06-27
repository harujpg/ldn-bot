const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servericon')
    .setDescription('Mostra o ícone do servidor'),
  async execute(interaction) {
    const guild = interaction.guild;
    const embed = new EmbedBuilder()
      .setColor(0x00BFFF)
      .setTitle(`Ícone do servidor: ${guild.name}`)
      .setImage(guild.iconURL({ dynamic: true, size: 512 }))
      .setFooter({ text: `ID: ${guild.id}` });
    await interaction.reply({ embeds: [embed] });
  }
}; 
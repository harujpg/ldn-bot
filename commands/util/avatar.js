const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Mostra o avatar de um usuário')
    .addUserOption(option =>
      option.setName('usuário')
        .setDescription('Usuário para mostrar o avatar')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('usuário') || interaction.user;
    const embed = new EmbedBuilder()
      .setColor(0x00BFFF)
      .setTitle(`Avatar de ${user.username}`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setFooter({ text: `ID: ${user.id}` });
    await interaction.reply({ embeds: [embed] });
  }
}; 
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-ticket')
    .setDescription('Envia o painel com botão para abrir ticket'),

  async execute(interaction) {
    const botao = new ButtonBuilder()
      .setCustomId('criar_ticket')
      .setLabel('📩 Abrir Ticket')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(botao);

    await interaction.reply({
      content: 'Clique no botão abaixo para abrir um **ticket de suporte**:',
      components: [row]
    });
  }
};

const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-ticket')
    .setDescription('Envia o painel com botão para abrir ticket'),

  async execute(interaction) {
    const cargoPermitidoId = '1385007781144297532'; // ID do cargo permitido
    const logChannelId = '1384682988255707166'; // ID do canal de logs
    const staffRoleId = '1384669180846018720'; // ID do cargo da staff

    // Verifica permissão
    if (!interaction.member.roles.cache.has(cargoPermitidoId)) {
      return interaction.reply({
        content: '❌ Você não tem permissão para usar este comando.',
        ephemeral: true
      });
    }

    // Cria botão
    const botao = new ButtonBuilder()
      .setCustomId('criar_ticket')
      .setLabel('📩 Abrir Ticket')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(botao);

    const embed = new EmbedBuilder()
      .setColor('#2f3136')
      .setTitle('🎫 Suporte Frost')
      .setDescription('Precisa de ajuda?\nClique no botão abaixo para abrir um **ticket privado** com nossa equipe.')
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setFooter({ text: 'Frost | Sistema de Atendimento', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};

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
    const cargoPermitidoId = '1384669173145272451'; // substitua pelo ID do cargo que pode usar o comando

    // Verifica se o membro tem o cargo
    if (!interaction.member.roles.cache.has(cargoPermitidoId)) {
      return interaction.reply({
        content: '❌ Você não tem permissão para usar este comando.',
        ephemeral: true // só o usuário vê essa mensagem
      });
    }


    const botao = new ButtonBuilder()
      .setCustomId('criar_ticket')
      .setLabel('📩 Abrir Ticket')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(botao);

    const embed = new EmbedBuilder()
      .setColor('#2f3136') // cor escura
      .setTitle('🎫 Suporte LDN')
      .setDescription('Precisa de ajuda?\nClique no botão abaixo para abrir um **ticket privado** com nossa equipe.')
      .setThumbnail(interaction.client.user.displayAvatarURL()) // avatar do bot
      .setFooter({ text: 'LDN | Sistema de Atendimento', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};

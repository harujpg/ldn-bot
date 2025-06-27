const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('limpar')
    .setDescription('Limpa uma quantidade de mensagens deste canal')
    .addIntegerOption(option =>
      option.setName('quantidade')
        .setDescription('Número de mensagens para apagar (2-100)')
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(100))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const quantidade = interaction.options.getInteger('quantidade');
    const canal = interaction.channel;

    // Tenta apagar as mensagens
    try {
      const mensagensApagadas = await canal.bulkDelete(quantidade, true);
      await interaction.reply({
        content: `🧹 ${mensagensApagadas.size} mensagens apagadas com sucesso!`,
        ephemeral: true
      });

      // Envia aviso no canal de logs
      const logChannel = interaction.guild.channels.cache.find(c => c.name === '﹕logs');
      if (logChannel) {
        logChannel.send(`🧹 **${interaction.user.tag}** apagou **${mensagensApagadas.size}** mensagens no canal ${canal} (${canal.name}).`);
      }
    } catch (error) {
      console.error('Erro ao limpar mensagens:', error);
      await interaction.reply({
        content: '❌ Não foi possível apagar as mensagens. Verifique se as mensagens têm menos de 14 dias e se o bot tem permissão.',
        ephemeral: true
      });
    }
  }
}; 
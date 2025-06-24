const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Remove o banimento de um usuário pelo ID.')
    .addStringOption(option =>
      option.setName('userid')
        .setDescription('ID do usuário a ser desbanido')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

  async execute(interaction) {
    const userId = interaction.options.getString('userid');

    // Substitua pelo ID do canal de logs
    const logChannelId = '1384682988255707166'; 

    try {
      const banInfo = await interaction.guild.bans.fetch(userId).catch(() => null);
      if (!banInfo) {
        return interaction.reply({ content: '❌ Este usuário não está banido.', ephemeral: true });
      }

      await interaction.guild.members.unban(userId);

      // Responde ao comando no chat onde foi usado
      await interaction.reply({ content: `✅ O usuário \`${userId}\` foi desbanido com sucesso.` });

      // Envia o log no canal de logs
      const logChannel = interaction.guild.channels.cache.get(logChannelId);
      if (logChannel) {
        const embed = new EmbedBuilder()
          .setTitle('🚪 Desbanimento realizado')
          .setColor('Green')
          .setDescription(`🔓 O usuário \`${userId}\` foi desbanido.`)
          .addFields(
            { name: '👮‍♂️ Moderador', value: `${interaction.user.tag}`, inline: true },
            { name: '🆔 ID do usuário', value: userId, inline: true }
          )
          .setTimestamp();

        logChannel.send({ embeds: [embed] });
      }
    } catch (error) {
      console.error('Erro ao desbanir:', error);
      return interaction.reply({
        content: '❌ Ocorreu um erro ao tentar desbanir este usuário.',
        ephemeral: true
      });
    }
  }
};

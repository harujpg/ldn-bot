const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bane um membro do servidor')
    .addUserOption(option =>
      option.setName('usuário').setDescription('Usuário para banir').setRequired(true))
    .addStringOption(option =>
      option.setName('motivo').setDescription('Motivo do banimento'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('usuário');
    const motivo = interaction.options.getString('motivo') || 'Sem motivo';
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: 'Usuário não encontrado.', ephemeral: true });
    }

    try {
      await member.ban({ reason: motivo });
      await interaction.reply(`✅ ${user.tag} foi banido. Motivo: ${motivo}`);

      const logChannel = interaction.guild.channels.cache.find(c => c.name === 'logs');
      if (logChannel) {
        logChannel.send(`🛠️ **${interaction.user.tag}** baniu **${user.tag}**. Motivo: ${motivo}`);
      }

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Não consegui banir esse usuário.', ephemeral: true });
    }
  }
};

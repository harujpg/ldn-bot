const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulsa um membro do servidor')
    .addUserOption(option =>
      option.setName('usuário').setDescription('Usuário para expulsar').setRequired(true))
    .addStringOption(option =>
      option.setName('motivo').setDescription('Motivo da expulsão'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('usuário');
    const motivo = interaction.options.getString('motivo') || 'Sem motivo';
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: 'Usuário não encontrado.', ephemeral: true });
    }

    try {
      await member.kick(motivo);
      await interaction.reply(`👢 ${user.tag} foi expulso. Motivo: ${motivo}`);

      const logChannel = interaction.guild.channels.cache.find(c => c.name === 'logs');
      if (logChannel) {
        logChannel.send(`🛠️ **${interaction.user.tag}** expulsou **${user.tag}**. Motivo: ${motivo}`);
      }

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Não consegui expulsar esse usuário.', ephemeral: true });
    }
  }
};

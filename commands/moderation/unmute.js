const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Remove o mute do usuário')
    .addUserOption(option =>
      option.setName('usuário').setDescription('Quem será desmutado').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('usuário');
    const member = interaction.guild.members.cache.get(user.id);
    const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Mutado');

    if (!muteRole || !member) {
      return interaction.reply({ content: 'Não encontrei o cargo ou o membro.', ephemeral: true });
    }

    await member.roles.remove(muteRole);
    await interaction.reply(`🔊 ${user.tag} foi desmutado.`);

    const logChannel = interaction.guild.channels.cache.find(c => c.name === 'logs');
    if (logChannel) {
      logChannel.send(`🛠️ **${interaction.user.tag}** desmutou **${user.tag}**.`);
    }
  }
};

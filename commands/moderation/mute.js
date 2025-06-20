const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Impede o usuário de enviar mensagens')
    .addUserOption(option =>
      option.setName('usuário').setDescription('Quem será mutado').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('usuário');
    const member = interaction.guild.members.cache.get(user.id);
    const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Mutado');

    if (!muteRole) {
      return interaction.reply({ content: 'Cargo "Mutado" não encontrado.', ephemeral: true });
    }

    if (!member) {
      return interaction.reply({ content: 'Usuário não encontrado.', ephemeral: true });
    }

    await member.roles.add(muteRole);
    await interaction.reply(`🔇 ${user.tag} foi mutado.`);

    const logChannel = interaction.guild.channels.cache.find(c => c.name === '﹕logs');
    if (logChannel) {
      logChannel.send(`🛠️ **${interaction.user.tag}** mutou **${user.tag}**.`);
    }
  }
};

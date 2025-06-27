const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// IDs dos cargos da staff (personalize conforme sua lista)
const STAFF_ROLES = [
  { id: '1385007781144297532', name: 'Executivo', emoji: '🛡️' },
  { id: '1384669179839512686', name: 'Admin', emoji: '🛡️' },
  { id: '1386766249454735472', name: 'Developer', emoji: '💻' },
  { id: '1384669180283977829', name: 'Moderador', emoji: '🟢' },
  { id: '1384669180846018720', name: 'Equipe Staff', emoji: '🟣' },
  { id: '1384669181823418489', name: 'Trial Staff', emoji: '🔵' },
  { id: '1384669182548775023', name: 'Movimentador', emoji: '🟠' },
  { id: '1384669182909747291', name: 'Parcerias', emoji: '🤝' },
  { id: '1384669183417253898', name: 'Eventos', emoji: '🎉' },
  { id: '1384669184058986616', name: 'Design', emoji: '🎨' }
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('staff')
    .setDescription('Mostra a lista da equipe staff do Frost🧊'),
  async execute(interaction) {
    const guild = interaction.guild;
    const embed = new EmbedBuilder()
      .setColor(0x00BFFF)
      .setTitle('❄️ Equipe Staff - Frost🧊')
      .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
      .setDescription('Conheça nossa equipe de staff que mantém o servidor organizado!')
      .setFooter({ 
        text: `Frost🧊 - ${guild.name}`, 
        iconURL: guild.iconURL({ dynamic: true }) 
      })
      .setTimestamp();

    let algumCargo = false;

    for (const roleInfo of STAFF_ROLES) {
      const role = guild.roles.cache.get(roleInfo.id);
      if (!role) continue;
      const members = role.members.map(member => {
        const status = member.presence?.status || 'offline';
        const statusEmoji = {
          'online': '🟢',
          'idle': '🟡',
          'dnd': '🔴',
          'offline': '⚫'
        };
        return `${statusEmoji[status]} <@${member.user.id}>`;
      });
      if (members.length > 0) {
        algumCargo = true;
        embed.addFields({
          name: `${roleInfo.emoji} ${roleInfo.name} [${members.length}]`,
          value: members.join('\n'),
          inline: false
        });
      }
    }

    if (!algumCargo) {
      return interaction.reply({
        content: '❌ Nenhum membro da staff encontrado.',
        ephemeral: true
      });
    }

    await interaction.reply({ embeds: [embed] });
  }
}; 
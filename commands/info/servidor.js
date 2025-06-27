const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servidor')
    .setDescription('Mostra informações sobre o servidor Frost🧊'),
  async execute(interaction) {
    const guild = interaction.guild;
    
    // Conta membros online
    const onlineMembers = guild.members.cache.filter(member => member.presence?.status !== 'offline').size;
    const totalMembers = guild.memberCount;
    
    // Conta canais por tipo
    const textChannels = guild.channels.cache.filter(channel => channel.type === 0).size;
    const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2).size;
    const categories = guild.channels.cache.filter(channel => channel.type === 4).size;
    
    // Conta cargos
    const totalRoles = guild.roles.cache.size;
    
    // Data de criação formatada
    const createdAt = Math.floor(guild.createdTimestamp / 1000);
    
    const embed = new EmbedBuilder()
      .setColor(0x00BFFF) // Azul claro - tema Frost
      .setTitle('❄️ Informações do Servidor Frost🧊')
      .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
      .addFields(
        {
          name: '👥 Membros',
          value: `**Total:** ${totalMembers}\n**Online:** ${onlineMembers}`,
          inline: true
        },
        {
          name: '📊 Canais',
          value: `**Texto:** ${textChannels}\n**Voz:** ${voiceChannels}\n**Categorias:** ${categories}`,
          inline: true
        },
        {
          name: '🎭 Cargos',
          value: `**Total:** ${totalRoles}`,
          inline: true
        },
        {
          name: '📅 Criado em',
          value: `<t:${createdAt}:F>\n(<t:${createdAt}:R>)`,
          inline: false
        },
        {
          name: '👑 Dono',
          value: `<@${guild.ownerId}>`,
          inline: true
        },
        {
          name: '🆔 ID do Servidor',
          value: `\`${guild.id}\``,
          inline: true
        }
      )
      .setFooter({ 
        text: `Frost🧊 - ${guild.name}`, 
        iconURL: guild.iconURL({ dynamic: true }) 
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
}; 
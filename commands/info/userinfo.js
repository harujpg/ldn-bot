const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Mostra informações sobre um usuário')
    .addUserOption(option =>
      option.setName('usuário')
        .setDescription('Usuário para ver informações (deixe vazio para você mesmo)')
        .setRequired(false)),
  async execute(interaction) {
    const targetUser = interaction.options.getUser('usuário') || interaction.user;
    const member = interaction.guild.members.cache.get(targetUser.id);
    
    if (!member) {
      return interaction.reply({ 
        content: '❌ Usuário não encontrado neste servidor.', 
        ephemeral: true 
      });
    }

    // Status do usuário
    const status = member.presence?.status || 'offline';
    const statusEmoji = {
      'online': '🟢',
      'idle': '🟡', 
      'dnd': '🔴',
      'offline': '⚫'
    };

    // Cargos do usuário (excluindo @everyone)
    const roles = member.roles.cache
      .filter(role => role.id !== interaction.guild.id)
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, 10); // Máximo 10 cargos

    // Data de entrada no servidor
    const joinedAt = Math.floor(member.joinedTimestamp / 1000);
    const createdAt = Math.floor(targetUser.createdTimestamp / 1000);

    // Permissões especiais
    const permissions = [];
    if (member.permissions.has('Administrator')) permissions.push('👑 Administrador');
    if (member.permissions.has('ManageGuild')) permissions.push('⚙️ Gerenciar Servidor');
    if (member.permissions.has('ManageMessages')) permissions.push('💬 Gerenciar Mensagens');
    if (member.permissions.has('BanMembers')) permissions.push('🔨 Banir Membros');
    if (member.permissions.has('KickMembers')) permissions.push('👢 Expulsar Membros');

    const embed = new EmbedBuilder()
      .setColor(0x00BFFF) // Azul claro - tema Frost
      .setTitle(`❄️ Informações de ${targetUser.username}`)
      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true, size: 256 }))
      .addFields(
        {
          name: '👤 Informações Básicas',
          value: `**Nome:** ${targetUser.username}\n**Tag:** ${targetUser.tag}\n**ID:** \`${targetUser.id}\``,
          inline: true
        },
        {
          name: '📊 Status',
          value: `**Status:** ${statusEmoji[status]} ${status}\n**Apelido:** ${member.nickname || 'Nenhum'}`,
          inline: true
        },
        {
          name: '📅 Datas',
          value: `**Conta criada:** <t:${createdAt}:R>\n**Entrou no servidor:** <t:${joinedAt}:R>`,
          inline: false
        },
        {
          name: `🎭 Cargos [${roles.length}]`,
          value: roles.length > 0 ? roles.join(', ') : 'Nenhum cargo',
          inline: false
        }
      )
      .setFooter({ 
        text: `Frost🧊 - ${interaction.guild.name}`, 
        iconURL: interaction.guild.iconURL({ dynamic: true }) 
      })
      .setTimestamp();

    // Adiciona campo de permissões se houver
    if (permissions.length > 0) {
      embed.addFields({
        name: '🔐 Permissões Especiais',
        value: permissions.join('\n'),
        inline: false
      });
    }

    await interaction.reply({ embeds: [embed] });
  }
}; 
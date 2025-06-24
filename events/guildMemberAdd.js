const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    // Canal onde a mensagem será enviada (ex: #geral)
    const canalId = '1384663820508860496';

    // IDs dos canais de regras e info
    const regrasId = '1384663640011046962'; // Substitua com o ID real do canal de regras
    const infoId = '1384971535424688159';   // Substitua com o ID real do canal de info

    const canal = member.guild.channels.cache.get(canalId);
    if (!canal) return console.warn('Canal de boas-vindas não encontrado.');

    const embed = new EmbedBuilder()
      .setColor('#00b0f4')
      .setTitle('🎉 Novo membro chegou!')
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(
        `👋 Olá <@${member.id}>, seja muito bem-vindo(a) ao **${member.guild.name}**!\n\n` +
        `📜 Leia as regras em <#${regrasId}> para evitar problemas,\n` +
        `ℹ️ E veja informações importantes em <#${infoId}>!\n\n` +
        `Aproveite, converse e divirta-se! 💬`
      )
      .setFooter({ text: `${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    try {
      const mensagem = await canal.send({ content: `<@${member.id}>`, embeds: [embed] });

      // Apaga a mensagem após 45 segundos (45.000 ms)
      setTimeout(() => {
        mensagem.delete().catch(() => null); // evita erro se a mensagem já foi apagada manualmente
      }, 45000);
    } catch (err) {
      console.error('Erro ao enviar ou apagar mensagem de boas-vindas:', err);
    }
  }
};
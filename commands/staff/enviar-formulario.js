const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enviar-formulario')
    .setDescription('Envia o formulário de candidatura diretamente no canal #formulario')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    // Verifica se o usuário tem permissão para usar o comando
    if (!interaction.member.permissions.has('ManageMessages')) {
      return await interaction.reply({
        content: '❌ Você não tem permissão para usar este comando!',
        ephemeral: true
      });
    }

    try {
      // Busca o canal pelo ID
      const canalFormulario = interaction.guild.channels.cache.get('1384682205774876772');
      
      if (!canalFormulario) {
        return await interaction.reply({
          content: '❌ Canal #formulario não encontrado! Verifique se o ID está correto.',
          ephemeral: true
        });
      }

      // Verifica se o bot tem permissão para enviar mensagens no canal
      if (!canalFormulario.permissionsFor(interaction.client.user).has('SendMessages')) {
        return await interaction.reply({
          content: '❌ O bot não tem permissão para enviar mensagens no canal #formulario!',
          ephemeral: true
        });
      }

      // Verifica se o bot tem permissão para usar embeds
      if (!canalFormulario.permissionsFor(interaction.client.user).has('EmbedLinks')) {
        return await interaction.reply({
          content: '❌ O bot não tem permissão para usar embeds no canal #formulario!',
          ephemeral: true
        });
      }

      const embed = new EmbedBuilder()
        .setColor(0x00BFFF) // Azul claro
        .setTitle('❄️ Candidatura para Staff - Frost🧊')
        .setDescription('Interessado em fazer parte da nossa equipe staff? Preencha o formulário abaixo!')
        .addFields(
          { 
            name: '📋 O que você precisa saber:',
            value: '• Ter pelo menos 16 anos\n• Estar ativo no servidor\n• Ter boa comunicação\n• Ser responsável e maduro\n• Ter disponibilidade de horário'
          },
          {
            name: '⏰ Disponibilidade necessária:',
            value: '• Mínimo de 3-5 horas por dia\n• Pelo menos 4 dias por semana\n• Horários flexíveis'
          },
          {
            name: '🎯 Responsabilidades:',
            value: '• Moderar o chat\n• Ajudar novos membros\n• Manter a ordem no servidor\n• Participar de eventos'
          }
        )
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setFooter({ 
          text: 'Frost🧊 - Equipe Staff', 
          iconURL: interaction.guild.iconURL({ dynamic: true }) 
        })
        .setTimestamp();

      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('📝 Candidatar-se Agora')
            .setStyle(ButtonStyle.Link)
            .setEmoji('❄️')
            .setURL('https://forms.gle/g3xNdVvLCvNv65gr5')
        );

      // Envia a mensagem no canal especificado
      await canalFormulario.send({
        embeds: [embed],
        components: [button]
      });

      await interaction.reply({
        content: `✅ Formulário enviado com sucesso no canal ${canalFormulario}!`,
        ephemeral: true
      });

    } catch (error) {
      console.error('Erro detalhado ao enviar formulário:', error);
      
      let errorMessage = '❌ Erro ao enviar o formulário.';
      
      if (error.code === 50013) {
        errorMessage = '❌ O bot não tem permissões suficientes no canal #formulario!';
      } else if (error.code === 50001) {
        errorMessage = '❌ Canal #formulario não encontrado ou inacessível!';
      } else if (error.code === 50005) {
        errorMessage = '❌ O bot não pode enviar mensagens neste canal!';
      }
      
      await interaction.reply({
        content: errorMessage,
        ephemeral: true
      });
    }
  }
}; 
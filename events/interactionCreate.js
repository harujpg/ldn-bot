const { 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  ChannelType, 
  PermissionsBitField, 
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require('discord.js');

const staffRoleId = '1384669180846018720'; // Coloque aqui o ID do cargo da staff
const logChannelName = '﹕logs'; // Nome do canal de logs (ajuste se quiser usar ID)

// Função auxiliar para sanitizar nome de canal
function sanitizeUsername(username) {
  return username.toLowerCase().replace(/[^a-z0-9]/g, '');
}

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    try {
      // TRATAMENTO DE COMANDOS SLASH
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
          await command.execute(interaction);
        } catch (error) {
          console.error('Erro ao executar comando:', error);
          if (!interaction.replied) {
            await interaction.reply({ content: '❌ Erro ao executar o comando.', ephemeral: true });
          }
        }
        return; // importante para não processar botão junto
      }

      // TRATAMENTO DE BOTÕES
      if (interaction.isButton()) {
        // Criar ticket
        if (interaction.customId === 'criar_ticket') {
          const nomeCanal = `ticket-${interaction.user.id}`;

          // Verifica se já existe ticket aberto com o nome do usuário pelo ID
          const existe = interaction.guild.channels.cache.find(c => c.name === nomeCanal);
          if (existe) {
            return interaction.reply({ content: '❗ Você já possui um ticket aberto.', ephemeral: true });
          }

          // Cria o canal de texto para o ticket
          const canal = await interaction.guild.channels.create({
            name: nomeCanal,
            type: ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
              },
              {
                id: interaction.user.id,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessages,
                  PermissionsBitField.Flags.AttachFiles,
                  PermissionsBitField.Flags.ReadMessageHistory
                ]
              },
              {
                id: staffRoleId,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.SendMessages,
                  PermissionsBitField.Flags.ReadMessageHistory
                ]
              }
            ]
          });

          // Botão para fechar ticket
          const fecharBtn = new ButtonBuilder()
            .setCustomId('fechar_ticket')
            .setLabel('🔒 Fechar Ticket')
            .setStyle(ButtonStyle.Danger);

          const row = new ActionRowBuilder().addComponents(fecharBtn);

          // Envia mensagem no canal do ticket com ping da staff
          await canal.send({
            content: `📢 <@&${staffRoleId}> Olá ${interaction.user}, a equipe foi notificada e em breve irá te atender!`,
            components: [row]
          });

          // Confirma para o usuário que o ticket foi criado
          await interaction.reply({ content: `✅ Seu ticket foi criado: ${canal}`, ephemeral: true });

          // Envia log
          const logChannel = interaction.guild.channels.cache.find(c => c.name === logChannelName);
          if (logChannel) {
            const embed = new EmbedBuilder()
              .setTitle('📩 Ticket Aberto')
              .setDescription(`Usuário: ${interaction.user.tag}\nCanal: ${canal}`)
              .setColor('Green')
              .setTimestamp();

            logChannel.send({ embeds: [embed] });
          }
          return;
        }

        // Fechar ticket
        if (interaction.customId === 'fechar_ticket') {
          const canal = interaction.channel;

          await interaction.reply({ content: '❗ Este ticket será fechado em 5 segundos...', ephemeral: true });

          // Log de fechamento
          const logChannel = interaction.guild.channels.cache.find(c => c.name === logChannelName);
          if (logChannel) {
            const embed = new EmbedBuilder()
              .setTitle('✅ Ticket Fechado')
              .setDescription(`Canal: ${canal.name}\nFechado por: ${interaction.user.tag}`)
              .setColor('Red')
              .setTimestamp();

            logChannel.send({ embeds: [embed] });
          }

          setTimeout(() => {
            canal.delete().catch(console.error);
          }, 5000);

          return;
        }
      }

      // Remover todo o tratamento relacionado ao embedwizard
      // (modais, botões, menus, dados temporários)
    } catch (error) {
      console.error('Erro na interação:', error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: '❌ Ocorreu um erro inesperado.', ephemeral: true });
      } else {
        await interaction.reply({ content: '❌ Ocorreu um erro inesperado.', ephemeral: true });
      }
    }
  }
};

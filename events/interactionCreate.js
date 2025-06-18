const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    // Slash Commands
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Erro ao executar o comando.', ephemeral: true });
      }
    }

    // Botões
    if (interaction.isButton()) {
      // 🔓 Criar ticket
      if (interaction.customId === 'criar_ticket') {
        const nomeCanal = `ticket-${interaction.user.username.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        const existe = interaction.guild.channels.cache.find(c => c.name === nomeCanal);

        if (existe) {
          return interaction.reply({ content: '❗ Você já possui um ticket aberto.', ephemeral: true });
        }

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
                PermissionsBitField.Flags.AttachFiles
              ]
            },
            {
              id: '1384669180846018720',
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.SendMessages
              ]
            }
          ]
        });

        const fecharBtn = new ButtonBuilder()
          .setCustomId('fechar_ticket')
          .setLabel('🔒 Fechar Ticket')
          .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(fecharBtn);

        await canal.send({
          content: `🎫 Ticket de <@${interaction.user.id}> criado com sucesso.`,
          components: [row]
        });

        await interaction.reply({ content: '✅ Seu ticket foi criado!', ephemeral: true });

        // Logs
        const logChannel = interaction.guild.channels.cache.find(c => c.name === 'logs');
        if (logChannel) {
          logChannel.send(`📩 Ticket aberto por **${interaction.user.tag}** em <#${canal.id}>`);
        }
      }

      // 🔒 Fechar ticket
      if (interaction.customId === 'fechar_ticket') {
        const canal = interaction.channel;

        await interaction.reply({
          content: '❗ Este ticket será fechado em 5 segundos...',
          ephemeral: true
        });

        // Logs
        const logChannel = interaction.guild.channels.cache.find(c => c.name === 'logs');
        if (logChannel) {
          logChannel.send(`✅ Ticket <#${canal.id}> fechado por **${interaction.user.tag}**`);
        }

        setTimeout(() => {
          canal.delete().catch(console.error);
        }, 5000);
      }
    }
  }
};

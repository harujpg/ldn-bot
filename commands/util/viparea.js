const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// IDs dos cargos VIP Blizzard e Booster
const VIP_BLIZZARD_ID = '1384669185317273761';
const BOOSTER_ID = '1384692344066015293';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('viparea')
    .setDescription('Comando exclusivo para VIP Blizzard e Boosters'),
  async execute(interaction) {
    const member = interaction.member;
    const temVip = member.roles.cache.has(VIP_BLIZZARD_ID) || member.roles.cache.has(BOOSTER_ID);

    if (!temVip) {
      return interaction.reply({
        content: '❌ Este comando é exclusivo para quem possui **VIP Blizzard** ou **Booster**.',
        ephemeral: true
      });
    }

    // Aqui você pode colocar qualquer ação VIP
    const embed = new EmbedBuilder()
      .setColor(0x00BFFF)
      .setTitle('🎉 Área VIP Frost🧊')
      .setDescription('Bem-vindo à área VIP! Aproveite seus benefícios exclusivos. Se quiser, posso personalizar esta mensagem ou adicionar funções especiais para VIPs.')
      .setFooter({ text: `Comando exclusivo para VIP Blizzard e Boosters` });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
}; 
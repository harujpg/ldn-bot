const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Envia um meme aleatório do Reddit'),
  async execute(interaction) {
    await interaction.deferReply();
    try {
      const res = await fetch('https://meme-api.com/gimme');
      const data = await res.json();
      if (!data || !data.url) throw new Error('Nenhum meme encontrado.');
      const embed = new EmbedBuilder()
        .setColor(0x00BFFF)
        .setTitle(data.title || 'Meme')
        .setImage(data.url)
        .setFooter({ text: `👍 ${data.ups || 0} | r/${data.subreddit || ''}` });
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await interaction.editReply('❌ Não foi possível buscar um meme agora. Tente novamente mais tarde.');
    }
  }
}; 
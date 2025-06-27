const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enquete')
    .setDescription('Cria uma enquete com até 5 opções para votação')
    .addStringOption(option =>
      option.setName('pergunta')
        .setDescription('Pergunta da enquete')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('opcao1')
        .setDescription('Opção 1')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('opcao2')
        .setDescription('Opção 2')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('opcao3')
        .setDescription('Opção 3')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('opcao4')
        .setDescription('Opção 4')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('opcao5')
        .setDescription('Opção 5')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const pergunta = interaction.options.getString('pergunta');
    const opcoes = [];
    for (let i = 1; i <= 5; i++) {
      const opcao = interaction.options.getString(`opcao${i}`);
      if (opcao) opcoes.push(opcao);
    }

    if (opcoes.length < 2) {
      return interaction.reply({ content: 'Você precisa fornecer pelo menos 2 opções para a enquete.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(0x00BFFF)
      .setTitle('📊 Nova Enquete!')
      .setDescription(`**${pergunta}**`)
      .addFields(opcoes.map((op, idx) => ({
        name: `${EMOJIS[idx]} Opção ${idx + 1}`,
        value: op,
        inline: false
      })))
      .setFooter({
        text: `Enquete criada por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setTimestamp();

    const message = await interaction.reply({ embeds: [embed], fetchReply: true });

    // Adiciona as reações
    for (let i = 0; i < opcoes.length; i++) {
      await message.react(EMOJIS[i]);
    }
  }
}; 
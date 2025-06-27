module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Bot online: ${client.user.tag}`);
    client.user.setPresence({
      activities: [
        { name: 'Frost crescer ❄️', type: 3 }, // Assistindo
        { name: 'sua comunidade', type: 2 },   // Ouvindo
        { name: '/ajuda | frost.gg', type: 0 } // Jogando
      ],
      status: 'online' // Pode ser 'online', 'idle', 'dnd'
    });
  }
};

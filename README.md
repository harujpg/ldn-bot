# Frost🧊 — Bot Discord

Bot completo para o servidor Frost, focado em moderação, utilidades, staff, informações e entretenimento.

---

## ✨ Visão Geral

- **Moderação:** ban, kick, mute, unmute, limpar mensagens, logs automáticos.
- **Utilidades:** ping, avatar, servericon, coinflip, dado, meme.
- **Staff:** sistema de formulário, painel de tickets, comandos exclusivos.
- **Informações:** dados do servidor, usuários, equipe staff.
- **Entretenimento:** comandos divertidos para engajar a comunidade.
- **Presença personalizada:** status e atividades modernas.

---

## 🚀 Instalação

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o arquivo `.env`:
   ```
   DISCORD_TOKEN=seu_token_aqui
   ```

3. Registre os comandos (se necessário):
   ```bash
   node deploy-commands.js
   ```

4. Inicie o bot:
   ```bash
   npm start
   ```

---

## 🗂️ Estrutura do Projeto

```
ldn_bot/
├── commands/
│   ├── moderation/   # Comandos de moderação (ban, kick, mute, limpar, etc)
│   ├── staff/        # Comandos de staff (formulário, tickets)
│   ├── info/         # Comandos de informações (servidor, userinfo, staff)
│   ├── ticket/       # Sistema de tickets
│   └── util/         # Utilidades e entretenimento (ping, avatar, meme, etc)
├── events/           # Eventos do bot (ready, guildMemberAdd, etc)
├── index.js          # Arquivo principal
└── deploy-commands.js# Deploy dos comandos slash
```

---

## 🛡️ Permissões Recomendadas

- Gerenciar Mensagens
- Enviar Mensagens
- Usar Embeds
- Gerenciar Cargos (para comandos de mute/unmute)
- Ler Histórico de Mensagens

---

## 📋 Comandos Principais

### Moderação
- `/ban` — Banir usuário
- `/kick` — Expulsar usuário
- `/mute` — Mutar usuário
- `/unmute` — Desmutar usuário
- `/unban` — Desbanir usuário
- `/limpar` — Limpar mensagens em massa

### Utilidades & Entretenimento
- `/ping` — Latência do bot
- `/avatar` — Avatar de qualquer usuário
- `/servericon` — Ícone do servidor
- `/coinflip` — Cara ou coroa
- `/dado` — Rola um dado de 6 lados
- `/meme` — Meme aleatório do Reddit

### Staff & Tickets
- `/enviar-formulario` — Envia formulário de candidatura para staff
- `/setup-ticket` — Painel para abrir tickets de suporte

### Informações
- `/servidor` — Info do servidor
- `/userinfo` — Info de usuário
- `/staff` — Lista da equipe staff

---

## 🎨 Presença Personalizada

O bot exibe atividades como:
- Assistindo: Frost crescer ❄️
- Ouvindo: sua comunidade
- Jogando: /ajuda | frost.gg

---

## 📝 Dicas

- Para alterar avatar, nome ou bio do bot, use o [Discord Developer Portal](https://discord.com/developers/applications).
- Para logs de moderação, use o canal `﹕logs` (crie se não existir).
- Sempre mantenha o bot com permissões adequadas nos canais de staff e moderação.

---

## 🆘 Suporte

Se tiver dúvidas ou quiser sugerir melhorias, abra uma issue no repositório ou fale com a equipe Frost! 
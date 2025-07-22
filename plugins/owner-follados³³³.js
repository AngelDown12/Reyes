const handler = async (m, { conn, participants }) => {
  const texto = `| 𝐅𝐨𝐥𝐥𝐚𝐝𝐨𝐬 𝐁𝐲 𝟑𝟑𝟑 |👑\n\n𝙂𝙧𝙪𝙥𝙤 𝙍𝙤𝙗𝙖𝙙𝙤 𝙇𝙤𝙇>3`;
  const users = participants.map(u => u.id).filter(v => v !== conn.user.jid);

  if (m.text?.toLowerCase().trim() !== 'follados') return;

  const mensajes = Array(10).fill({
    text: texto,
    mentions: users
  });

  for (const msg of mensajes) {
    conn.sendMessage(m.chat, msg).catch(() => {});
  }
};

handler.customPrefix = /^follados$/i;
handler.command = /^$/;
handler.group = true;
handler.botAdmin = false;

export default handler;
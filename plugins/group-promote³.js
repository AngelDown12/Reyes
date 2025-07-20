let handler = async (m, { conn }) => {
  const body = m.text?.trim().toLowerCase();


  if (body !== 'promote') return;

  // Solo si estás respondiendo a alguien
  const user = m.quoted?.sender;
  if (!user) {
    return conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
};

handler.customPrefix = /^promote$/i;
handler.command = new RegExp();
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
let handler = async function (m, { conn }) {
  if (!m.isGroup) return global.dfail('group', m, conn)

  let groupMetadata
  try {
    groupMetadata = await conn.groupMetadata(m.chat)
  } catch (e) {
    console.error(e)
    return global.dfail('groupinfo', m, conn)
  }

  const participantes = groupMetadata?.participants || []
  if (!participantes.length) return m.reply('⚠️ No se encontraron participantes en este grupo.')

  const tarjetas = participantes.map((p, index) => {
    const rawJid = p.id || ''
    const [user, domain] = rawJid.split('@')

    // Si es LID, mostrar tal cual
    const lid = domain === 'lid' ? `${user}@lid` : `${user}@s.whatsapp.net`

    const estado = p.admin === 'superadmin'
      ? '👑 Superadmin'
      : p.admin === 'admin'
        ? '🛡️ Admin'
        : '👤 Miembro'

    return [
      `📄 *Participante ${index + 1}*`,
      `👤 *Usuario:* @${user}`,
      `🆔 *LID:* ${lid}`,
      `📌 *Estado:* ${estado}`
    ].join('\n')
  })

  const salida = tarjetas.join('\n\n')
  const mencionados = participantes.map(p => p.id).filter(Boolean)
  
  return conn.sendMessage(m.chat, { text: salida, mentions: mencionados }, { quoted: m })
}

handler.command = ['lid']
handler.help = ['lid']
handler.tags = ['group']

export default handler
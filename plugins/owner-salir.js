let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
let pp = 'https://files.catbox.moe/cqyt08.mp4'
await conn.sendMessage(m.chat, { video: { url: pp }, gifPlayback: true, caption: '☁️ Adiós Putitas   𝗥𝗲𝘆𝗲𝘀 - 𝗕𝗼𝘁', mentions: [m.sender] }, { quoted: m })
await conn.groupLeave(id)}
handler.help = ['salir']
handler.tags = ['owner']
handler.command = /^(salir|out|leavegc|leave|salirdelgrupo)$/i
handler.group = true
handler.rowner = true

export default handler

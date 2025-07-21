import fetch from 'node-fetch'

let handler = async (m, { text, args, command, usedPrefix }) => {
  if (!args[0]) return m.reply(`📌 Usa: ${usedPrefix + command} <IP o dominio>\nEj: ${usedPrefix + command} 8.8.8.8`)

  try {
    let res = await fetch(`http://ip-api.com/json/${args[0]}?fields=status,message,country,regionName,city,zip,lat,lon,isp,org,query`)
    let json = await res.json()

    if (json.status !== 'success') throw json.message

    let info = `🌐 *Información IP: ${json.query}*

📍 *Ciudad:* ${json.city}
🏙️ *Región:* ${json.regionName}
🌎 *País:* ${json.country}
🏷️ *Código Postal:* ${json.zip}
📡 *ISP:* ${json.isp}
🏢 *Organización:* ${json.org}
📌 *Ubicación:* ${json.lat}, ${json.lon}`

    m.reply(info)
  } catch (e) {
    m.reply(`❌ Error: ${e}`)
  }
}
handler.command = ['ip', 'ipinfo']
export default handler
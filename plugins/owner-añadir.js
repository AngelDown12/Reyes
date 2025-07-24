const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  if (!isOwner) return m.reply('Este comando solo lo puede usar el Owner.');

  let link = args[0];
  if (!link) return m.reply(`Usa el comando así:\n${usedPrefix + command} https://chat.whatsapp.com/xxxxxxxxxxxxxxxxxxx`);

  let match = link.match(linkRegex);
  if (!match) return m.reply('❌ Link inválido. Asegúrate que sea un link de grupo válido.');

  let code = match[1];

  try {
    const res = await conn.groupAcceptInvite(code); // El bot se mete (opcional)
    
    // Ahora intenta invitarte a ti
    let user = m.sender.split('@')[0]; // tu número
    await conn.groupInviteCode(res).catch(() => { throw 'No tengo permisos para invitar.' });
    await conn.groupAdd(res, [`${user}@s.whatsapp.net`]);

    m.reply('✅ Te he añadido al grupo.');
  } catch (e) {
    console.error(e);
    m.reply('❌ No pude añadirte. Asegúrate de que el bot esté en el grupo y tenga permisos.');
  }
};

handler.help = ['añadir <link del grupo>'];
handler.tags = ['owner'];
handler.command = /^añadir$/i;
handler.owner = true; // Solo tú puedes usarlo

export default handler;
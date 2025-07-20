import { execSync } from "child_process";

const handler = async (m, { conn, text }) => {
  if (!m.text) return;
  const body = m.text.trim().toLowerCase();
  if (!["update", "actualizar"].includes(body)) return;

  await m.reply(`*[ 𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎 ]*`);
  try {
    if (global.conn.user.jid === conn.user.jid) {
      let stdout = execSync("git pull" + (m.fromMe && text ? " " + text : ""));
      await conn.reply(m.chat, stdout.toString(), m);
    }
  } catch {
    let update = execSync("git remote set-url origin https://github.com/Sisked-Bot/Prueba-.git && git pull");
    await m.reply(update.toString());
  }
};

handler.command = new RegExp; // sin comando explícito
handler.customPrefix = /^(update|actualizar)$/i;
handler.owner = true;

export default handler;
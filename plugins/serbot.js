const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  makeInMemoryStore,
  PHONENUMBER_MCC
} = await import('@whiskeysockets/baileys')

import moment from 'moment-timezone'
import NodeCache from 'node-cache'
import readline from 'readline'
import qrcode from 'qrcode'
import crypto from 'crypto'
import fs from 'fs'
import pino from 'pino'
import * as ws from 'ws'
const { CONNECTING } = ws
import { Boom } from '@hapi/boom'
import { makeWASocket } from '../lib/simple.js'

if (!(global.conns instanceof Array)) global.conns = []

const store = makeInMemoryStore({ logger: pino({ level: 'silent' }).child({ level: 'silent' }) })

let handler = async (m, { conn: _conn, args, usedPrefix, command }) => {
  let parent = args[0] === 'plz' ? _conn : await global.conn
  if (!(args[0] === 'plz' || (await global.conn).user.jid === _conn.user.jid)) {
    return m.reply(`Este comando solo puede ser usado en el bot principal! wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix}code`)
  }

  async function serbot() {
    let authFolderB = crypto.randomBytes(10).toString('hex').slice(0, 8)

    if (!fs.existsSync('./serbot/' + authFolderB)) {
      fs.mkdirSync('./serbot/' + authFolderB, { recursive: true })
    }

    if (args[0]) {
      fs.writeFileSync('./serbot/' + authFolderB + '/creds.json', JSON.stringify(JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')), null, '\t'))
    }

    const { state, saveCreds } = await useMultiFileAuthState(`./serbot/${authFolderB}`)
    const msgRetryCounterMap = {}
    const msgRetryCounterCache = new NodeCache()
    const { version } = await fetchLatestBaileysVersion()
    const phoneNumber = m.sender.split('@')[0]

    // 🔥 ACTIVO el pairing code automáticamente
    const methodCode = !args[0]
    const MethodMobile = false

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      browser: ['Ubuntu', 'Chrome', '20.0.04'],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' }))
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (clave) => {
        let jid = jidNormalizedUser(clave.remoteJid)
        let msg = await store.loadMessage(jid, clave.id)
        return msg?.message || ''
      },
      msgRetryCounterCache,
      msgRetryCounterMap,
      defaultQueryTimeoutMs: undefined,
      version
    }

    let conn = makeWASocket(connectionOptions)
    conn.isInit = false
    let isInit = true

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin } = update
      if (isNewLogin) conn.isInit = true

      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode

      if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
        let i = global.conns.indexOf(conn)
        if (i >= 0) {
          delete global.conns[i]
          global.conns.splice(i, 1)
        }

        if (code !== DisconnectReason.connectionClosed) {
          parent.sendMessage(m.chat, { text: 'Conexión perdida..' }, { quoted: m })
        }
      }

      if (global.db.data == null) loadDatabase?.()

      if (connection === 'open') {
        conn.isInit = true
        global.conns.push(conn)

        await parent.reply(
          m.chat,
          args[0]
            ? 'Conectado con éxito'
            : '✅ Conectado exitosamente con WhatsApp\n\n*Nota:* Esto es temporal.\nSi el bot principal se reinicia o se apaga, todos los sub bots también lo harán.\n\nGuarda este enlace:\nhttps://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S',
          m,
          rcanal
        )

        await sleep(5000)

        if (!args[0]) {
          await parent.reply(conn.user.jid, 'La siguiente vez que te conectes, usa este mensaje para iniciar sesión sin otro código:', m, rcanal)

          await parent.sendMessage(
            conn.user.jid,
            {
              text:
                usedPrefix +
                command +
                ' ' +
                Buffer.from(fs.readFileSync('./serbot/' + authFolderB + '/creds.json'), 'utf-8').toString('base64')
            },
            { quoted: m }
          )
        }
      }
    }

    // 💥 Solicita código de emparejamiento si aplica
    if (methodCode && !state.creds.registered) {
      if (!phoneNumber) return
      let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '')
      if (Handler && typeof Handler === 'object' && Object.keys(Handler).length > 0) {
  handler = Handler
}

      setTimeout(async () => {
        let codeBot = await conn.requestPairingCode(cleanedNumber)
        codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
        let txt = `–  *S E R B O T  -  S U B B O T*\n\n`
        txt += `┌  ✩  *Usa este Código para convertirte en un Sub Bot*\n`
        txt += `│  ✩  Pasos\n`
        txt += `│  ✩  *1* : Haga click en los 3 puntos\n`
        txt += `│  ✩  *2* : Toque dispositivos vinculados\n`
        txt += `│  ✩  *3* : Selecciona *Vincular con el número de teléfono*\n`
        txt += `└  ✩  *4* : Escriba el Codigo\n\n`
        txt += `*Nota:* Este Código solo funciona en el número que lo solicitó`

        await parent.reply(m.chat, txt, m, rcanal)
        await parent.reply(m.chat, codeBot, m, rcanal)
        rl.close()
      }, 3000)
    }

    setInterval(async () => {
      if (!conn.user) {
        try { conn.ws.close() } catch { }
        conn.ev.removeAllListeners()
        let i = global.conns.indexOf(conn)
        if (i >= 0) {
          delete global.conns[i]
          global.conns.splice(i, 1)
        }
      }
    }, 60000)

    let handler = await import('../handler.js')
    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
        if (Object.keys(Handler || {}).length) handler = Handler
      } catch (e) {
        console.error(e)
      }

      if (restatConn) {
        try { conn.ws.close() } catch { }
        conn.ev.removeAllListeners()
        conn = makeWASocket(connectionOptions)
        isInit = true
      }

      if (!isInit) {
        conn.ev.off('messages.upsert', conn.handler)
        conn.ev.off('connection.update', conn.connectionUpdate)
        conn.ev.off('creds.update', conn.credsUpdate)
      }

      conn.handler = handler.handler.bind(conn)
      conn.connectionUpdate = connectionUpdate.bind(conn)
      conn.credsUpdate = saveCreds.bind(conn, true)

      conn.ev.on('messages.upsert', conn.handler)
      conn.ev.on('connection.update', conn.connectionUpdate)
      conn.ev.on('creds.update', conn.credsUpdate)

      isInit = false
      return true
    }

    creloadHandler(false)
    conn.ev.on('connection.update', connectionUpdate)
  }

  serbot()
}

handler.help = ['code']
handler.tags = ['serbot']
handler.command = ['ser333', 'code']
handler.rowner = false

export default handler

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
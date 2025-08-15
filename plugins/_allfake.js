import fetch from 'node-fetch'

export async function before(m, { conn }) {
//let img = await (await fetch(`https://files.catbox.moe/6fo871.jpg`)).buffer()
let img = catalogo
 global.fake = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363403653198246@newsletter",
      serverMessageId: 100,
      newsletterName: '𝐂𝐡𝐚𝐧𝐞𝐥 .|. 𝐑𝐞𝐲𝐞𝐬𝟑𝟑𝟑',
    },
	    externalAdReply: {
				    showAdAttribution: true,
					title: botname,
					body: 'Hola',
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnailUrl: 'https://files.catbox.moe/6fo871.jpg',
		           sourceUrl: canal,
		           mediaType: 1,
                   renderLargerThumbnail: false
	    },
    },
  }

 global.adReply = {
	    contextInfo: { 
             forwardingScore: 9999, 
                 isForwarded: false, 
                    externalAdReply: {
				    showAdAttribution: true,
					title: botname,
					body: textbot,
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnailUrl: img,
                    thumbnail: img,
		           sourceUrl: canal,
		           mediaType: 1,
                   renderLargerThumbnail: true
				}
			}
		}

global.rcanal = {
contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363403653198246@newsletter",
serverMessageId: 100,
newsletterName: '𝐂𝐡𝐚𝐧𝐞𝐥 .|. 𝐑𝐞𝐲𝐞𝐬𝟑𝟑𝟑',
},
externalAdReply: { 
showAdAttribution: true,
title: '𝗥𝗲𝘆𝗲𝘀 - 𝗕𝗼𝘁',
body: '𝗥𝗲𝘆𝗲𝘀',
previewType: "PHOTO",
thumbnailUrl: 'https://files.catbox.moe/6fo871.jpg',
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: false
},},}
	
}

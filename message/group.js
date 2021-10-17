"use strict";
const {
	MessageType,
	Presence
} = require("@adiwajshing/baileys");
const fs = require("fs");

const { getBuffer, sleep } = require("../lib/myfunc");
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
const left = JSON.parse(fs.readFileSync('./database/left.json'))

let setting = JSON.parse(fs.readFileSync('./config.json'));
let { botName } = setting

module.exports = async(xinz, anj, welcome, left) => {
    const isWelcome = welcome.includes(anj.jid)
    const isLeft = left.includes(anj.jid)
    const mdata = await xinz.groupMetadata(anj.jid)
    const groupName = mdata.subject
    const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
let kma = gam1
let mhan = await xinz.prepareMessage(anj.jid, kma, MessageType.image)
const buttonMessages = {
imageMessage: mhan.message.imageMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 4
}
xinz.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}

    if (anj.action === 'add'){
        if (anj.participants[0] === xinz.user.jid){
            await sleep(5000)
            xinz.updatePresence(anj.jid, Presence.composing)
            xinz.sendMessage(anj.jid, `Assalamualaikum`, MessageType.text)
        } else if (isWelcome){
            try {
                var pic = await xinz.getProfilePicture(anj.participants[0])
            } catch {
                var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
            }
            let wenong = `━━━ *「 WELCOME 」* ━━━

Hai kak @${anj.participants[0].split("@")[0]} 👋 selamat datang di Grup ${groupName} , Budayakan baca deskripsi ya`
let welnong = `Selamat datang member baru`
           let bug = [
            {buttonId: 'beban', buttonText: {displayText: 'Beban baru 😅'}, type: 1}
            ]
            sendButImage(anj.jid, wenong, welnong, await getBuffer(pic), bug, {contextInfo:{"mentionedJid":[anj.participants[0]]}})
        }
    } else if (anj.action === 'remove' && isLeft){
        try {
            var pic = await xinz.getProfilePicture(anj.participants[0])
        } catch {
            var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }
        xinz.sendMessage(anj.jid, await getBuffer(pic), MessageType.image, { caption: `━━━ *「 BABAY 」* ━━━

Babay @${anj.participants[0].split("@")[0]} 👋 selamat kluar  , Moga sensara idup lo`, contextInfo: {"mentionedJid": [anj.participants[0]]}})
} else if (anj.action == 'promote') {
       try {
            var pic = await xinz.getProfilePicture(anj.participants[0])
        } catch {
            var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }
    	var teks = `━━━ *「 PROMOTE 」* ━━━

*PROMOTE* : @${anj.participants[0].split("@")[0]}
*DI GRUP* : ${groupName}`
        var ini_img = await getBuffer(pic)
    	xinz.sendMessage(anj.jid, ini_img, MessageType.image, { caption: teks, contextInfo: {"mentionedJid": [anj.participants[0]]}})
    } else if (anj.action == 'demote') {
       try {
            var pic = await xinz.getProfilePicture(anj.participants[0])
        } catch {
            var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }
        var teks = `━━━ *「 DEMOTE 」* ━━━

*DEMOTE DETECT* : @${anj.participants[0].split("@")[0]}
*DI GRUP* : ${groupName}`
        var ini_img = await getBuffer(pic)
	    xinz.sendMessage(anj.jid, ini_img, MessageType.image, { caption: teks, contextInfo: {"mentionedJid": [anj.participants[0]]}})
    }
}

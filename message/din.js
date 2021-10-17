"use strict";
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
    MessageOptions,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    waChatKey,
    mentionedJid,
    WA_DEFAULT_EPHEMERAL
} = require("@adiwajshing/baileys");
const fs = require("fs");
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const qrcode = require("qrcode");
const ffmpeg = require("fluent-ffmpeg");
const fetch = require("node-fetch");
const ms = require("parse-ms");
const axios = require("axios");
const speed = require("performance-now");
const yts = require("yt-search");
const translate = require("@vitalets/google-translate-api");
const { da } = require("@vitalets/google-translate-api/languages");
const PhoneNumber = require("awesome-phonenumber")

// stickwm
const Exif = require('../lib/exif')
const exif = new Exif()

const { color, bgcolor } = require("../lib/color");
const { getBuffer, getRandom, getGroupAdmins, runtime, serialize, fetchJson } = require("../lib/myfunc");
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const _prem = require("../lib/premium");
const _sewa = require("../lib/sewa");
const afk = require("../lib/afk");
const { addBanned, unBanned, BannedExpired, cekBannedUser } = require("../lib/banned");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const tictac = require("../lib/tictac");
const { yta, ytv } = require("../lib/ytdl");
const { getUser, getPost, searchUser } = require('../lib/instagram');
const { fbdl } = require("../lib/fbdl");
const { fakeStatus, fakeToko, } = require("./fakeReply");
const game = require("../lib/game");
const { addBadword, delBadword, isKasar, addCountKasar, isCountKasar, delCountKasar } = require("../lib/badword");
const stickcmd = JSON.parse(fs.readFileSync('./database/stickcmd.json'))

		
// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let setting = JSON.parse(fs.readFileSync('./config.json'));
let mess = JSON.parse(fs.readFileSync('./message/mess.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let antiviewonce = JSON.parse(fs.readFileSync('./database/antiviewonce.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let ban = JSON.parse(fs.readFileSync('./database/ban.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let _update = JSON.parse(fs.readFileSync('./database/update.json'))
let badword = JSON.parse(fs.readFileSync('./database/badword.json'));
let grupbadword = JSON.parse(fs.readFileSync('./database/grupbadword.json'));
let senbadword = JSON.parse(fs.readFileSync('./database/senbadword.json'));
let mute = JSON.parse(fs.readFileSync('./database/mute.json'));
let tebaklagu = JSON.parse(fs.readFileSync('./database/tebaklagu.json'))
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
const left = JSON.parse(fs.readFileSync('./database/left.json'))


		
// Game
let tictactoe = [];
let tebakgambar = [];
let family100 = [];
let kuis = [];

// Prefix
let multi = false
let nopref = true
let prefa = 'anjing'

if (global.conns instanceof Array) console.log()
else global.conns = []

let {
    ownerNumber,
    owner,
    ig,
    ownerName,
    textsewa,
    limitCount,
    lolkey,
    xteam,
    botName,
    gamewaktu,
    emote,
    fakeButons,
    fakeTromli,
    email,
    emitet,
} = setting


function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async (xinz, msg, _afk, welcome, left) => {
    try {
        const { menu, sewa, rules, help, ownerr, infobot} = require("./help");
        const { type, quotedMsg, isGroup, isQuotedMsg, mentioned, sender, from, fromMe, pushname, isBaileys } = msg
        let { chats } = msg
        if (isBaileys) return
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
// STICKCMD
        if (type == MessageType.sticker) {
            let cmde3 = msg.message.stickerMessage.fileSha256.toString('base64')
            let find3 = stickcmd.find(e => e.id == cmde3)
            if (find3) chats = find3.command
        }

        const args = chats.split(' ')
        const command = chats.toLowerCase().split(' ')[0] || ''
       if (xinz.multi) {
            var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
        } else {
            if (xinz.nopref) {
                prefix = ''
            } else {
                prefix = xinz.prefa
            }
        }

        const isCmd = command.startsWith(prefix)
        const q = chats.slice(command.length + 1, chats.length)
        const body = chats.startsWith(prefix) ? chats : ''


        const botNumber = xinz.user.jid
        const groupMetadata = isGroup ? await xinz.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.jid : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender) || false
        const isAntiVO = isGroup ? antiviewonce.includes(from) : false

        const isOwner = ownerNumber.includes(sender)
            const getGroup = async function(totalchat){
    	let grup = []
 	    let a = []
    	let b = []
    	for (c of totalchat){
		a.push(c.jid)
    	}
    	for (d of a){
		if (d && d.includes('g.us')){
			b.push(d)
		}
    	}
    	for (e of b){
		let ingfo = await xinz.groupMetadata(e)
		grup.push(ingfo)
    	}
    	return grup
        }

        const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
        const isSewa = _sewa.checkSewaGroup(from, sewa)
        const isBan = cekBannedUser(sender, ban)
        const isAfkOn = afk.checkAfkUser(sender, _afk)
        const isAntiLink = isGroup ? antilink.includes(from) : false
        const isAntiWame = isGroup ? antiwame.includes(from) : false
        const isWelcome = isGroup ? welcome.includes(from) : false
        const isLeft = isGroup ? left.includes(from) : false
        const isUser = pendaftar.includes(sender)
        const isBadword = isGroup ? grupbadword.includes(from) : false
        const isMuted = isGroup ? mute.includes(from) : false


        const gcounti = setting.gcount
        const gcount = isPremium ? gcounti.prem : gcounti.user
        const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss z')
        const totalchat = await xinz.chats.all()
        const tanggal = moment().format("ll")
        
        let mengt =`${fakeTromli}`        
        const fakeTroli = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? {remoteJid: "status@broadcast" } : {}) }, message: {orderMessage: {itemCount: 2021, status: 200, surface: 200, message: mengt, orderTitle: mengt, thumbnail: fs.readFileSync(setting.pathImg), sellerJid: '0@s.whatsapp.net'}}}        
        const fakelokasi = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? {remoteJid: "status@broadcast" } : {}) }, message: {locationMessage: {degreesLatitude: -7.0389318, degreesLongitude: 113.8969749, name: 'DIN-BOT BC', address: 'Halo', jpegThumbnail: fs.readFileSync('./media/din.jpg')}}}        
        const faketoko = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? {remoteJid: "status@broadcast" } : {}) }, message: {productMessage: {product: {currencyCode: "BRL", title: 'DIN-BOT', priceAmount1000: 0, productImageCount: 0, productImage: {jpegThumbnail: fs.readFileSync('./media/din.jpg')}}, businessOwnerJid: "0@s.whatsapp.net"}}}        
        const fgc = {key: {"fromMe": false,"participant": "0@s.whatsapp.net","remoteJid": "62895619083555-1616169743@g.us"},"message": {"groupInviteMessage": {"groupJid": "62895619083555-1616169743@g.us","inviteCode": "mememteeeekkeke","groupName": "P", "caption": `My dinata Bot`, thumbnail: fs.readFileSync('./media/din.jpg')}}}
        const ftext = {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})},message: { "extendedTextMessage": {"text": `Dinata Gamteng`,"title": `Hmm`,'jpegThumbnail': fs.readFileSync(setting.pathImg)}}}

        let fakeLink = {
             "title": `Hai Kak ${pushname}`,
             "body": `${jam}`,
             "previewType": "VIDIO",
             "thumbnail": fs.readFileSync(setting.pathImg),
             "mediaUrl": "https://youtu.be/7BqlUxaWXKs"
        }        
        // Jam kontol
        const timeWib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
		const timeWit= moment().tz('Asia/Makassar').format('HH:mm:ss')
        const timeWita = moment().tz('Asia/Jayapura').format('HH:mm:ss')
        
        let d = new Date();
        let locale = "id";        
        let gmt = new Date(0).getTime() - new Date("1 January 1970").getTime();
        let weton = ["𝒑𝒂𝒉𝒊𝒏𝒈", "𝒑𝒐𝒏", "𝒘𝒂𝒈𝒆", "𝒌𝒍𝒊𝒘𝒐𝒏", "𝒍𝒆𝒈𝒊"][
        Math.floor((d * 1 + gmt) / 84600000) % 5];
        let week = d.toLocaleDateString(locale, { weekday: "long" });
        
        const foto = fs.readFileSync(setting.pathImg)
        
        const buttel = [
                  {buttonId: 'id1', buttonText: {displayText: 'Regist'}, type: 1},
                       ]
                       
        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        function monospace(string) {
            return '```' + string + '```'
        }
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        function randomNomor(angka) {
            return Math.floor(Math.random() * angka) + 1
        }
        const nebal = (angka) => {
            return Math.floor(angka)
        }
        const reply = (teks) => {
            return xinz.sendMessage(from, teks, text, {quoted: fakeTroli, contextInfo: {externalAdReply: fakeLink, mentionedJid: parseMention(teks) }})
        }  
//buton image             
        const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
            let kma = gam1
            let mhan = await xinz.prepareMessage(from, kma, image)
        const buttonMessages = {
            imageMessage: mhan.message.imageMessage,
            contentText: text1,
            footerText: desc1,
            buttons: but,
            headerType: 4
        }
            xinz.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }
// Buton Fidio
        const sendButVidio = async(id, text1, desc1, gam1, but = [], options = {}) => {
            let kma = gam1
            let mhan = await xinz.prepareMessage(from, kma, image)
        const buttonMessages = {
            videoMessage: mhan.message.videoMessage,
            contentText: text1,
            footerText: desc1,
            buttons: but,
            headerType: 5
        }
            xinz.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }
// Buton menu image
        const sendMenubut = async(id, text1, desc1, gam1, but = [], options = {}) => {
            let kma = gam1
            let mhan = await xinz.prepareMessage(from, kma, image, { thumbnail: fs.readFileSync('./media/din.jpg')})
        const buttonMessages = {
            imageMessage: mhan.message.imageMessage,
            contentText: text1,
            footerText: desc1,
            buttons: but,
            headerType: 4
        }
            xinz.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }  
// Buton Vidio
        const sendButVideo = async(id, text1, desc1, vid1, but = [], options = {}) => {
              let kma = vid1
              let mhan = await xinz.prepareMessage(from, kma, video)
        const buttonMessages = {
              videoMessage: mhan.message.videoMessage,
              contentText: text1,
              footerText: desc1,
              buttons: but,
              headerType: 5
}
xinz.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}      
// Buton location 
        const sendButloc = async(id, text1, desc1, gam1, but = [], options = {}) => {
               let kma = gam1
               xinz.sendMessage(id, {"contentText": text1,
               "footerText": desc1, 
               "buttons": but,
               "headerType": "LOCATION",
                       "locationMessage": {
                   "text": "halo",
                   "name": "South Brisbane",
                   "address": "Cloudflare, Inc",
                   "jpegThumbnail": kma
                }}, MessageType.buttonsMessage, {quoted: fakeTroli, contextInfo:{mentionedJid: parseMention(text1, desc1)}}, options)  
              }             
// send Troli
  const sendTroli = async(jid, text, title, itemCount, thumbnail, msg) => {
const item = await xinz.prepareMessageFromContent(jid,{
"orderMessage": {
"orderId": '155157279766079',
"itemCount": itemCount,
"description": `tes`,
"status": 'INQUIRY',
"surface":'CATALOG',
"message": text,
"thumbnail": thumbnail,
"orderTitle": title,
"sellerJid": jid,
"token": 'AR5wc3iY2NY8yJaK9MMXdlK/aguUxoA8yPtSFcvt0lrE5g=='
}
}, 
{quoted: fakeTroli, contextInfo:{}}) 
await xinz.relayWAMessage(item)
}



        xinz.reply = (id, cht, msg) => {
            return xinz.sendMessage(id, cht, text, {quoted: msg})
        }
        const sendMess = (hehe, teks) => {
            return xinz.sendMessage(hehe, teks, text)
        }
        const mentions = (teks, memberr, id) => {
            let ai = (id == null || id == undefined || id == false) ? xinz.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : xinz.sendMessage(from, teks.trim(), extendedText, { quoted: msg, contextInfo: { "mentionedJid": memberr } })
            return ai
        }
               function pickRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        async function sendFileFromUrl(from, url, caption, msg, men) {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            let type = mime.split("/")[0] + "Message"
            if (mime === "image/gif") {
                type = MessageType.video
                mime = Mimetype.gif
            }
            if (mime === "application/pdf") {
                type = MessageType.document
                mime = Mimetype.pdf
            }
            if (mime.split("/")[0] === "audio") {
                mime = Mimetype.mp4Audio
            }
            return xinz.sendMessage(from, await getBuffer(url), type, { caption: caption, quoted: msg, mimetype: mime, contextInfo: { "mentionedJid": men ? men : [] } })
        }
        const textImg = (teks) => {
            return xinz.sendMessage(from, teks, text, { quoted: msg, thumbnail: fs.readFileSync(setting.pathImg) })
        }
        const sendList = (from, title, desc, footer, butt, list, msg, men) => {
            return this.sendMessage(from, {"title": title,"description": desc,"footerText":footer,"buttonText":butt,"listType": "SINGLE_SELECT","sections": list}, MessageType.listMessage, {quoted: msg, contextInfo: {"mentionedJid": men ? men : []}})
        }        
// Fake Gk ada guna cek     
      
        const fakeimage = (teks) => {
            xinz.sendMessage(from, fs.readFileSync('./media/Qris.jpg'), MessageType.image,
                {
                    quoted: {
                        key: {
                            fromMe: false,
                            participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                        },
                        message: {
                            "imageMessage": {
                                "mimetype": "image/jpeg",
                                "caption": "Hai kak",
                                "jpegThumbnail": fs.readFileSync(setting.pathImg)
                            }
                        }
                    },
                    caption: teks
                })
        }
        const fstatus = (teks) => {
                xinz.sendMessage(from, teks, MessageType.text,
                {
                quoted: {
                key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },
                message: { "imageMessage": {
                "mimetype": "image/jpeg", 
                "caption": "Loaxinzg menu nya", 
                "jpegThumbnail": fs.readFileSync(setting.pathImg)
                }
           }
          }
        })
        }

        const sleep = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
        }

// Fake Yutube        
        let fakeYutub = {
             "title": `Hai Kak ${pushname}`,
             "body": `${jam}`,
             "mediaType": 2,
             "previewType": 2,
             "thumbnail": fs.readFileSync('./media/asupan.jpg'),
             "mediaUrl": "https://youtu.be/_JLQ9QZbMsY"
        }

        const isImage = (type === 'imageMessage')
        const isVideo = (type === 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isViewOnce = (type == 'viewOnceMessage')        
        const isQuotedImage = isQuotedMsg ? (quotedMsg.type === 'imageMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? (quotedMsg.type === 'videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? (quotedMsg.type === 'stickerMessage') ? true : false : false
        
        const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByReply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []
        
        const bisnis = {
        
        "displayName": `${ownerName}`,
        "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:Dinata;\nFN:Dinata\nORG:D I N A T A\nTITLE:\nitem1.TEL;waid=6282339783204\nitem1.X-ABLabel:Telepon\nX-WA-BIZ-DESCRIPTION:Meng dinata dulu gk see\nX-WA-BIZ-NAME:Dinataa\nEND:VCARD"
        }
        
//Ucapan Waktunya kak
        const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if(time2 < "23:59:00"){
                 var ucapanWaktu = 'Selamat Malam 🌚'
                                        }
                 if(time2 < "19:00:00"){
                 var ucapanWaktu = 'Selamat Petang'
                                         }
                 if(time2 < "18:00:00"){
                 var ucapanWaktu = 'Selamat Sore'
                                         }
                 if(time2 < "15:00:00"){
                 var ucapanWaktu = 'Selamat Siang 🌞'
                                         }
                 if(time2 < "11:00:00"){
                 var ucapanWaktu = 'Selamat Pagi'
                                         }
                 if(time2 < "05:00:00"){
                 var ucapanWaktu = 'Selamat Malam'
                                         }
                        


           // Mode
        if (xinz.mode === 'self') {
            if (!fromMe) return
        }

        // Anti link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                xinz.groupRemove(from, [sender])
            }
        }
        // Anti wame
        if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.match(/(wa.me\/)/gi)) {
                reply(`*「 NOMOR LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link nomor, maaf kamu akan di kick`)
                xinz.groupRemove(from, [sender])
            }
        }
        // Badword
        if (isGroup && isBadword && !isOwner && !isGroupAdmins) {
            for (let kasar of badword) {
                if (chats.toLowerCase().includes(kasar)) {
                    if (isCountKasar(sender, senbadword)) {
                        if (!isBotGroupAdmins) return reply(`Kamu beruntung karena bot bukan admin`)
                        reply(`*「 ANTI BADWORD 」*\n\nSepertinya kamu sudah berkata kasar lebih dari 5x, maaf kamu akan di kick`)
                        xinz.groupRemove(from, [sender])
                        delCountKasar(sender, senbadword)
                    } else {
                        addCountKasar(sender, senbadword)
                        reply(`Kamu terdeteksi berkata kasar\nJangan ulangi lagi atau kamu akan dikick`)
                    }
                }
            }
        }

        // Banned
        if (isBan) return reply(`Maaf kak @${sender.split("@")[0]} anda sudah terblokir/ter ban oleh bot\nchat Wa.me/${owner} untuk membuka ban tersebut`)
        BannedExpired(ban)

        // MUTE
        if (isMuted) {
            if (!isGroupAdmins && !isOwner) return
            if (chats.toLowerCase().startsWith(prefix + 'unmute')) {
                let anu = mute.indexOf(from)
                mute.splice(anu, 1)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                reply(`Bot telah diunmute di group ini`)
            }
        }

        // TicTacToe
        if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // GAME 
        game.cekWaktuFam(xinz, family100)
        game.cekWaktuTG(xinz, tebakgambar)
        game.cekWaktuTL(xinz, tebaklagu)
        game.cekWaktuKuis(xinz, kuis)

        // GAME 
        if (game.isTebakGambar(from, tebakgambar) && isUser) {
            if (chats.toLowerCase().includes(game.getJawabanTG(from, tebakgambar))) {
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await reply(`*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, tebakgambar)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? kirim *${prefix}tebakgambar*`)
                tebakgambar.splice(game.getTGPosi(from, tebakgambar), 1)
            }
        }
        if (game.isfam(from, family100) && isUser) {
            var anjuy = game.getjawaban100(from, family100)
            for (let i of anjuy) {
                if (chats.toLowerCase().includes(i)) {
                    var htgmi = Math.floor(Math.random() * 20) + 1
                    addBalance(sender, htgmi, balance)
                    await reply(`*Jawaban benar*\n*Jawaban :* ${i}\n*Hadiah :* $${htgmi}\n*Jawaban yang blum tertebak :* ${anjuy.length - 1}`)
                    var anug = anjuy.indexOf(i)
                    anjuy.splice(anug, 1)
                }
            }
            if (anjuy.length < 1) {
                xinz.sendMessage(from, `Semua jawaban sudah tertebak\nKirim *${prefix}family100* untuk bermain lagi`, text)
                family100.splice(game.getfamposi(from, family100), 1)
            }
        }
        if (game.isTebakLagu(from, tebaklagu) && isUser){
            if (chats.toLowerCase().includes(game.getJawabanTL(from, tebaklagu))){
                var htgm = randomNomor(500)
                addBalance(sender, htgm, balance)
                await reply(`*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTL(from, tebaklagu)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? kirim *${prefix}tebaklagu*`)
                tebaklagu.splice(game.getTLPosi(from, tebaklagu), 1)
            }
        }  
        if (game.isKuisGame(from, kuis) && isUser){
          if (chats.toLowerCase().includes(game.getJawabanKuis(from, kuis))){
            var htgm = randomNomor(100)
            addBalance(sender, htgm, balance)
            await reply(`*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanKuis(from, kuis)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? kirim *${prefix}kuis*`)
            kuis.splice(game.getKuisPosi(from, kuis), 1)
          }
        }   

        // Premium
        _prem.expiredCheck(premium)

        // Sewa
        _sewa.expiredCheck(xinz, sewa)

       // Auto Regist
        if (isCmd && !isUser) {
            pendaftar.push(sender)
            fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar))
        }
        
        
        //   Afk seting
        if (isGroup) {
            if (mentioned.length !== 0) {
                for (let ment of mentioned) {
                    if (afk.checkAfkUser(ment, _afk)) {
                        const getId = afk.getAfkId(ment, _afk)
                        const getReason = afk.getAfkReason(getId, _afk)
                        const getTime = Date.now() - afk.getAfkTime(getId, _afk)
                        const heheh = ms(getTime)
                        const butafk = [
            {buttonId: '!hedeh', buttonText: {displayText: 'Oke lah'}, type: 1}            
                         ]
        let taiafk = `*Afk Mode 💤*\n\n_Mohon maaf kak @${ment.split('@')[0]} Sedang afk_`
        let alesafk = `• *Alasan* : ${getReason}\n• *Sejak* : ${heheh.hours} Jam, ${heheh.minutes} Menit, ${heheh.seconds} Detik lalu`
        let dehafk =`Patnert ditemukan , mohon sopan ke dia ya kak`
                const buttonafk = {
                contentText: taiafk,
                footerText: alesafk,
                buttons: butafk,
                headerType: 1
         }
                        await xinz.sendMessage(from, buttonafk, MessageType.buttonsMessage, {quoted: msg, contextInfo:{mentionedJid: [ment]}})
                        sendMess(ment, `Ada yang mencari anda saat anda offline\n\nNama : ${pushname}\nNomor : wa.me/${sender.split("@")[0]}\nIn Group : ${groupName}\nPesan : ${chats}`)
                    }
                }
            }
            if (afk.checkAfkUser(sender, _afk)) {
                _afk.splice(afk.getAfkPosition(sender, _afk), 1)
                fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                await mentions(`@${sender.split('@')[0]} telah kembali`, [sender], true)
            }
        }

       // Auto Read
        xinz.chatRead(from, "read")
        
        //Anti VO
        if (isGroup && isViewOnce && isAntiVO && xinz.mode !== 'self') {
            let typenya = msg.message.viewOnceMessage.message["videoMessage"] ? msg.message.viewOnceMessage.message.videoMessage : msg.message.viewOnceMessage.message.imageMessage
            typenya["viewOnce"] = false
            typenya["caption"] = `\`\`\`Anti-ViewOnce\n\n\nCaption : ${(typenya.caption === '') ? 'NONE' : typenya.caption}\`\`\``
            let peq = msg.message.viewOnceMessage.message["imageMessage"] ? { key: { fromMe: false, participant: sender, id: msg.key.id }, message: {"viewOnceMessage": {"message": { "imageMessage" : {"viewOnce": true } } } } } :  { key: { fromMe: false, participant: sender, id: msg.key.id }, message: {"viewOnceMessage": {"message": { "imageMessage" : {"viewOnce": true } } } } }
            let pe = await xinz.prepareMessageFromContent(from, msg.message.viewOnceMessage.message, {quoted: peq})
            await xinz.relayWAMessage(pe)
        }
        // CMD
        if (isCmd && !isGroup) {
            //xinz.updatePresence(from, Presence.composing)
            addBalance(sender, randomNomor(20), balance)
            console.log(color('[DIN]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))
        }
        if (isCmd && isGroup) {
            //xinz.updatePresence(from, Presence.composing)
            addBalance(sender, randomNomor(20), balance)
            console.log(color('[DIN]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        }

        if (isOwner) {
            if (chats.startsWith("> ")) {
                console.log(color('[DIN-VAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`DIN-BOT ada dimana mana`))
                try {
                    let evaled = await eval(chats.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    textImg(`${evaled}`)
                } catch (err) {
                    textImg(`${err}`)
                }
            } else if (chats.startsWith("$ ")) {
                console.log(color('[DIN-EXE]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`DIN-BOT ada dimana mana`))
                exec(chats.slice(2), (err, stdout) => {
                    if (err) return textImg(`${err}`)
                    if (stdout) textImg(`${stdout}`)})}}

                                              
           //----------------------< Command Broo >--------------------------                                                                                                                    
                                                                                                                             
        switch (command){   
        
                                                                                                                                                                                                                                                                                                                                                                                                    
             case prefix+'menubot':{             
                   let totalchat = await xinz.chats.all()
                   let i = []
                   let giid = []
                   for (let mem of totalchat) {
                   i.push(mem.jid)
                   }
                for (let id of i) {
                    if (id && id.includes('g.us')) {
                        giid.push(id)
                    }
                }
                let cekvip1 = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premino = `${cekvip1.days} 𝑯𝒂𝒓𝒊`
                
                let timestampi = speed();
                let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = xinz.user.phone
                let anu = process.uptime()
                            try {
                var pic = await xinz.getProfilePicture(`${sender.split('@')[0]}@c.us`)
            } catch {
                var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
            }
let img = await getBuffer(pic)
let menuhe = `❐──➨ *「 𝑰𝒏𝒇𝒐 𝒖𝒔𝒆𝒓 」*
${emitet}Name : *${pushname}*
${emitet}Api : *@${sender.split("@")[0]}* 
${emitet}Status = *${isOwner ? '𝑶𝒘𝒏𝒆𝒓' : isPremium ? '𝑷𝒓𝒆𝒎𝒊𝒖𝒎' : '𝑮𝒓𝒂𝒕𝒊𝒔𝒂𝒏'}*
${emitet}Limit = *${isPremium ? '𝑼𝒏𝒍𝒊𝒎𝒊𝒕𝒆𝒅' : `${getLimit(sender, limitCount, limit)}`}*
${emitet}Limit game = *${cekGLimit(sender, gcount, glimit)}*
${emitet}Expired Prem : *${isOwner ? '𝑷𝒆𝒓𝒎𝒂𝒏𝒆𝒏𝒕' : isPremium ? premino : '𝑵𝒐𝒕 𝒑𝒓𝒆𝒎𝒊𝒖𝒎'}*

❐──➨ *「 𝑰𝒏𝒇𝒐 𝒃𝒐𝒕 」*
${emitet}Bot name : *${botName}*
${emitet}Creator : *@${owner}*
${emitet}Owner : *${ownerName}*
${emitet}Active : *${runtime(process.uptime())}*
${emitet}Speed :  *${latensii.toFixed(4)}* 𝑫𝒆𝒕𝒊𝒌
${emitet}Total chat : *${totalchat.length}*
${emitet}Group Chat : *${giid.length}*
${emitet}User Bot : *${pendaftar.length}*

❐──➨ *「 𝑪𝒂𝒍𝒆𝒏𝒅𝒆𝒓 」*
${emote} Jam : *${timeWib} 𝑾𝒊𝒃*
${emote} Jam : *${timeWita} 𝑾𝒊𝒕𝒂*
${emote} Jam : *${timeWit} 𝑾𝒊𝒕*
${emote} tanggal : *${tanggal}*
${emote} Tgl jawa : ${week} ${weton}

${menu(prefix, emote)}
 
*Creator By dinata*
_WhatsApp Bot simple_`
let prep = await xinz.prepareMessage('0@c.us', img, image, { thumbnail: await getBuffer(pic)}) 
let imgMsg = prep.message.imageMessage
res = await xinz.prepareMessageFromContent(from,{
"productMessage": {
"product": {
"productImage": imgMsg,
"productId": "0",
"title": `LIST MENU ${botName}`,
"description": menuhe,
"footerText": `Menu By dinata`,
"currencyCode": "IDR",
"priceAmount1000": "0",
"productImageCount": 1
},
"businessOwnerJid": `${ownerNumber}`,
}
}, {quoted: fakeTroli, mimetype: 'image/jpeg', contextInfo:{externalAdReply: fakeLink }}) 

xinz.relayWAMessage(res)
}
break
case 'Mks': {
const me = `Ya sama sama kak ${pushname}`

xinz.sendMessage(from, me, text, { quoted: msg, contextInfo: {
						text: "Dream Bot",
						forwarxinzgScore: 2,
						isForwarded: true,
						sendEphemeral: true,
						externalAdReply: {
							title: `Hem Sama sama om`,
							body: "",
							previewType: 1,
							thumbnail: fs.readFileSync(setting.pathImg),
							sourceUrl: "https://m.youtube.com/channel/UCXSV65eSv_UYS0qVl1yorMg",
					}, mentionedJid: sender}})
					}
                      break
                                 case prefix+'translate':{
                  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                  if (args.length < 2) return reply(`Kirim perintah *${command}* kodebaha teks`)
                  var res = await translate(body.slice(13), {to: args[1]})
                  xinz.sendMessage(from, res, text, {quoted: msg})
                  limitAdd(sender, limit)
                  }
                  break
                               case prefix+'off':
                  if (!isOwner)return reply(mess.OnlyOwner)
                  reply('Sukses Mematikan Bot, byeee 👋')
                  await sleep(5000)
                  process.exit()
                  break
			
            case prefix+'report':
                 if (args.length < 2) return textImg('Lu mau lapor apa?')
                 var waktu = moment().format('DD/MM/YY')
                                  var yahaha = ["fakelokasi"]
                 var fake = pickRandom(yahaha)
                 var yoi = 'Masalah telah di laporkan kepada owner, maaf atas ketidak nyamanannya\nNote : Laporan yang main-main akan di block + di banned oleh owner!\n\nTerimakasih atas masukannya'
                 textImg(yoi)
                 if (!isGroup) {
                 var tks = `_*REPORT FROM USER!*_\n\n*Pengirim :* @${sender.split("@")[0]}\n*Pesan :* ${args.join(" ")}\n*Waktu :* ${waktu}`
                 } else if (isGroup) {
                 var tks = `*REPORT FROM USER!*\n\n*Pengirim :* @${sender.split("@")[0]}\n*Pesan :* ${args.join(" ")}\n*In Group :* ${groupName}\n*Waktu :* ${waktu}`
                 }
                 var teks = `xinz.sendMessage(ownerNumber, tks, text, {quoted: ${fake}, thumbnail: fs.readFileSync(setting.pathImg), contextInfo: {mentionedJid: parseMention(tks)}})`
                 await eval(teks)
                 break
                              case prefix+'tohex':
                  if (!isPremium && !isOwner) return
                  teks = msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('hex')
                  textImg(`"${teks}"`)
                  break
                
                case prefix+'patnertbot':
                case prefix+'patnert':
                case prefix+'botpatnert':{
                    let listown = [`${ownerNumber}`,'6281916849086','6287863200063']
                    let arrey = []
                    for ( let x of listown){
                        const getnem = xinz.getName(x + '@s.whatsapp.net')
                        const conara = { displayName: getnem, vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + getnem + '\n' + 'ORG:Kontak\n' + 'TEL;type=CELL;type=VOICE;waid=' + x + ':+' + x + '\n' + 'END:VCARD'.trim()}
                        arrey.push(conara)
                    }
                    xinz.sendMessage(from, { contacts: arrey }, MessageType.contactsArray, {quoted: msg })
                                    .then((res) => xinz.sendMessage(from, 'Patnert Dinata - Bot >_<', text, {quoted: res}))
                    
                 }
                 break
                
                
              //-----------------------[ Help ]------------------------ 
              case 'Assalamualaikum':
              case 'assalamualaikum':{
                    textImg(`waalaikumsalam kak ${pushname}`)
                    }
              break 
              case prefix+'menu':
              case prefix+'help':{  
                let timestampi = speed();              
                let latensii = speed() - timestampi   
                let mena = ['1','2','3','4','5','6','7','8']  
                let menhe = mena[Math.floor(Math.random() * mena.length)]                         
                let menu1 = `${help(ucapanWaktu, sender, email, owner, ig)}`
                     let desc =`speed to ${latensii.toFixed(4)} s`
                     const buttons = [
                            {buttonId: prefix+'menubot', buttonText: {displayText: 'List menu'}, type: 1},
                            {buttonId: prefix+'owner', buttonText: {displayText: 'Owner Bot'}, type: 1}
                                       ]
              sendButloc(from, menu1, desc, fs.readFileSync(`./media/menu/menu${menhe}.jpg`), buttons, MessageType.buttonsMessage)
              }
              break   
              case prefix+'cariteman':{
                          var nomor = pendaftar[Math.floor(Math.random() * pendaftar.length)]
                          var nama = `Teman acak`
                      xinz.sendContact(from, nomor.split("@")[0], nama, msg)
                           await sleep(1000)   
                      const buttons = [
                            {buttonId: prefix+'cariteman', buttonText: {displayText: 'Next ⏩'}, type: 1},
                            {buttonId: prefix+'menubot', buttonText: {displayText: 'Back ⏪'}, type: 1}
                                       ]
                      let culek =`Teman ditemukan , mohon sopan ke dia ya kak`
                      const buttonMessage = {
                          contentText: culek,
                          footerText: 'Cie gk punya temen ya pakek fitur ini\npower by *DIN-BOT*',
                          buttons: buttons,
                          headerType: 1
                                     }

                      xinz.sendMessage(from, buttonMessage, MessageType.buttonsMessage, reply, teks)
                                     }
              break
              case prefix + 'ownermenu':{
                 if (!isOwner) return reply(mess.OnlyOwner)              
                   let menub = `Halo kak @${owner}`
                      const buttons = [
                            {buttonId: prefix+'runtime', buttonText: {displayText: 'Runtime ⏰'}, type: 1},
                            {buttonId: prefix+'speed', buttonText: {displayText: 'Speed 🚤'}, type: 1}
                                       ]                   
                   sendButloc(from, menub, ownerr(prefix, owner, emote), foto, buttons, {quoted: msg, contextInfo:{mentionedJid: parseMention(menub)}})
                   }
                   break
              case prefix+'sewabot':{
                    let menunya = sewa(ucapanWaktu, botName, owner)
                    let buttons = [
                       {buttonId: prefix+'infobot', buttonText: {displayText: 'Info Bot'}, type: 1},
                       {buttonId: prefix+'owner', buttonText: {displayText: 'Owner Bot'}, type: 1}
                                  ]

                   sendButImage(from, menunya, `Power By *${botName}*\nOwner by ${ownerName}`, fs.readFileSync('./media/Qris.jpg'), buttons, {quoted: msg, contextInfo:{mentionedJid: [ownerNumber, sender]}})
               }
              break

        //------------------< STICK CMD >-------------------
        case prefix + 'setcmd': {
            if (!isPremium) return reply(mess.OnlyPrem)           
            if (!isQuotedSticker) return reply('Reply Sticker')
            let cmde1 = quotedMsg.stickerMessage.fileSha256.toString('base64')
            let find1 = stickcmd.find(v => v.id == cmde1)
            if (find1) return reply("Udh ada sticker nya")
            let obj = {
                id: cmde1,
                command: q
            }
            stickcmd.push(obj)
            fs.writeFileSync('./database/stickcmd.json', JSON.stringify(stickcmd))
            reply('Berhasil')
        }
        break
        case prefix + 'delcmd': {
            if (!isPremium) return reply(mess.OnlyPrem)            
            if (!isQuotedSticker) return reply('Reply Sticker')
            let cmde2 = quotedMsg.stickerMessage.fileSha256.toString('base64')
            let find2 = stickcmd.findIndex(v => v.id == cmde2)
            if (!find2) return reply("Ga ada sticker nya")
            stickcmd.splice(find2, 1)
            fs.writeFileSync('./database/stickcmd.json', JSON.stringify(stickcmd))
            reply('Berhasil')
        }
        break     

        
               //------------------< Meng random >-------------------        
            case prefix+'quotes':{
					if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
					axios.get(`https://api-botindo.herokuapp.com/api/randomquote?apikey=Alphabot`)
					.then(({data}) => {
					xinz.sendMessage(data.quotes)
					})
				}
				break        
            //------------------< Multi Session >------------------- // By aqul 
            case prefix + 'listbot': {
                let arrayBot = [];
                let tmx = `*List ${botName}*\n\n`
                tmx += `=> Nomor : @${global.xinz.user.jid.split("@")[0]}\n`
                tmx += `=> Prefix : ${global.xinz.multi ? 'MULTI PREFIX' : global.xinz.nopref ? 'NO PREFIX' : global.xinz.prefa}\n`
                tmx += `=> Status : ${global.xinz.mode.toUpperCase()}\n\n`
                arrayBot.push(global.xinz.user.jid)
                for (let i of conns) {
                    tmx += `=> Nomor : @${i.user.jid.split("@")[0]}\n`
                    tmx += `=> Prefix : ${i.multi ? 'MULTI PREFIX' : i.nopref ? 'NO PREFIX' : i.prefa}\n`
                    tmx += `=> Status : ${i.mode.toUpperCase()}\n\n`
                    arrayBot.push(i.user.jid)
                }
                tmx += `Total : ${conns.length + 1}`
                mentions(tmx, arrayBot, true)
            }
                break
            case prefix + 'stopjadibot': {
                if (global.xinz.user.jid == xinz.user.jid) xinz.reply(from, 'Jangan tinggalkan aku sayang', msg)
                else {
                    await xinz.reply(from, 'Bye...', msg).then(() => xinz.close())
                }
            }
                break
            case prefix + 'getcode': {
                if (global.xinz.user.jid == xinz.user.jid) xinz.reply(from, 'Command ini hanya untuk yang jadi bot', msg)
                else global.xinz.reply(xinz.user.jid, `${prefix}jadibot ${Buffer.from(JSON.stringify(xinz.base64EncodedAuthInfo())).toString('base64')}`, msg)
            }
                break
            case prefix + 'jadibot': {
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)               
                limitAdd(sender, limit)
                let parent = args[1] && args[1] == 'plz' ? xinz : global.xinz
                let auth = false
                if (global.conns.length >= 4) return reply(`Maaf maksimal bot adalah 5, coba lain kali`)
                if ((args[0] && args[0] == 'plz') || global.xinz.user.jid == xinz.user.jid || xinz.user.jid == ownerNumber) {
                    let id = global.conns.length
                    let conn = new global.xinz.constructor()
                    conn.multi = true
                    conn.nopref = false
                    conn.prefa = 'anjing'
                    if (args[1] && args[1].length > 200) {
                        let json = Buffer.from(args[1], 'base64').toString('utf-8')
                        // global.conn.reply(m.isGroup ? m.sender : m.chat, json, m)
                        let obj = JSON.parse(json)
                        await conn.loadAuthInfo(obj)
                        auth = true
                    }
                    conn.mode = 'self'
                    conn.spam = []
                    conn.baterai = {
                        baterai: 0,
                        cas: false
                    };
                    conn.logger.level = 'warn'
                    conn.on('qr', async qr => {
                        qrcode.toDataURL(qr, { scale: 8 }, async (err, Durl) => {
                            const data = Durl.replace(/^data:image\/png;base64,/, '')
                            const bufferDataQr = new Buffer.from(data, 'base64');
                            let scan = await parent.sendImage(from, bufferDataQr, 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini \nQR Expired dalam 20 detik', msg)
                            setTimeout(() => {
                                parent.deleteMessage(from, scan.key)
                            }, 30000)
                        })
                    })
                    conn.connect().then(async ({ user }) => {
                        parent.reply(from, `Berhasil tersambung dengan whatsapp\n\nCek Private Chat untuk informasi lebih lanjut`, msg)
                        parent.sendMessage(user.jid, `Hai sekarang kamu terhubung dengan server ${botName} Bot\n\n• Mode : ${conn.mode.toUpperCase()}\n• Prefix : ${conn.multi ? 'MULTI PREFIX' : conn.nopref ? 'NO PREFIX' : conn.prefa}\n\n• Sekarang kamu berada di mode self, kirim perintah *${conn.multi ? '#public' : conn.nopref ? 'public' : conn.prefa + 'public'}* untuk berubah ke mode public\n\n• Untuk berhenti jadi bot kirim perintah *${conn.multi ? '#stop' : conn.nopref ? 'stop' : conn.prefa + 'stop'}*\n\n${monospace(`HARAP GUNAKAN BOT DENGAN BIJAK`)}`, MessageType.text)
                        //parent.reply(from, `Berhasil tersambung dengan WhatsApp - mu.\nSekarang kamu berada di mode self, kirim ${prefix}public untuk pindah ke mode public\n*NOTE: Ini cuma numpang*\n` + JSON.stringify(user, null, 2), msg)
                        if (auth) return
                        await parent.sendMessage(user.jid, `Kamu bisa login tanpa qr dengan pesan dibawah ini. untuk mendapatkan kode lengkapnya, silahkan kirim *${prefix}getcode* untuk mendapatkan kode yang akurat`, MessageType.extendedText)
                        parent.sendMessage(user.jid, `${command} ${Buffer.from(JSON.stringify(conn.base64EncodedAuthInfo())).toString('base64')}`, MessageType.extendedText)
                    })
                    conn.on('chat-update', async (quli) => {
                        if (!quli.hasNewMessage) return
                        quli = quli.messages.all()[0]

                        if (!quli.message) return
                        if (quli.key && quli.key.remoteJid == 'status@broadcast') return
                        let msgi = serialize(conn, quli)
                        module.exports(conn, msgi, _afk, welcome, left)
                    })
                    conn.on('CB:action,,battery', json => {
                        const a = json[2][0][1].value
                        const b = json[2][0][1].live
                        conn.baterai.baterai = a
                        conn.baterai.cas = b
                    })
                    conn.regenerateQRIntervalMs = null
                    setTimeout(() => {
                        if (conn.user) return
                        conn.close()
                        let i = global.conns.indexOf(conn)
                        if (i < 0) return
                        delete global.conns[i]
                        global.conns.splice(i, 1)
                    }, 60000)
                    conn.on('close', () => {
                        setTimeout(async () => {
                            try {
                                if (conn.state != 'close') return
                                if (conn.user && conn.user.jid)
                                    parent.sendMessage(conn.user.jid, `Koneksi terputus...`, MessageType.extendedText)
                                let i = global.conns.indexOf(conn)
                                if (i < 0) return
                                delete global.conns[i]
                                global.conns.splice(i, 1)
                            } catch (e) { conn.logger.error(e) }
                        }, 30000)
                    })
                    global.conns.push(conn)
                } else {
                    reply('Tidak bisa membuat bot didalam bot!\n\nhttps://wa.me/' + global.xinz.user.jid.split`@`[0] + '?text=#jadibot')
                }
            }
                break
                
            //------------------< Sticker / Tools >-------------------
            case prefix + 'exif': {
                if (!isOwner) return
                const namaPack = q.split('|')[0] ? q.split('|')[0] : q
                const authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                exif.create(namaPack, authorPack)
                await reply('Done gan')
            }
                break
            case prefix + 'sticker':
            case prefix + 'stiker':
            case prefix + 's':
            case prefix + 'stickergif':
            case prefix + 'sgif': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    await ffmpeg(`${media}`)
                        .input(media)
                        .on('start', function (cmd) {
                            console.log(`Started : ${cmd}`)
                        })
                        .on('error', function (err) {
                            console.log(`Error : ${err}`)
                            fs.unlinkSync(media)
                            reply(mess.error.api)
                        })
                        .on('end', function () {
                            console.log('Finish')
                            exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                                if (error) return reply(mess.error.api)
                                xinz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, { quoted: msg })
                                limitAdd(sender, limit)
                                fs.unlinkSync(media)
                                fs.unlinkSync(`./sticker/${sender}.webp`)
                            })
                        })
                        .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                        .toFormat('webp')
                        .save(`./sticker/${sender}.webp`)
                } else if ((isVideo && msg.message.videoMessage.fileLength < 10000000 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    reply(mess.wait)
                    await ffmpeg(`${media}`)
                        .inputFormat(media.split('.')[4])
                        .on('start', function (cmd) {
                            console.log(`Started : ${cmd}`)
                        })
                        .on('error', function (err) {
                            console.log(`Error : ${err}`)
                            fs.unlinkSync(media)
                            let tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                            reply(mess.error.api)
                        })
                        .on('end', function () {
                            console.log('Finish')
                            exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                                if (error) return reply(mess.error.api)
                                xinz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, { quoted: msg })
                                limitAdd(sender, limit)
                                fs.unlinkSync(media)
                                fs.unlinkSync(`./sticker/${sender}.webp`)
                            })
                        })
                        .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                        .toFormat('webp')
                        .save(`./sticker/${sender}.webp`)
                } else {
                    reply(`Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
            }
                break
            case prefix + 'stickerwm': case prefix + 'swm': case prefix + 'take': case prefix + 'takesticker': case prefix + 'takestick': {
                if (!isPremium) return reply(mess.OnlyPrem)
                if (args.length < 2) return reply(`Penggunaan ${command} nama|author`)
                let packname1 = q.split('|')[0] ? q.split('|')[0] : q
                let author1 = q.split('|')[1] ? q.split('|')[1] : ''
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    exif.create(packname1, author1, `stickwm_${sender}`)
                    await ffmpeg(`${media}`)
                        .input(media)
                        .on('start', function (cmd) {
                            console.log(`Started : ${cmd}`)
                        })
                        .on('error', function (err) {
                            console.log(`Error : ${err}`)
                            fs.unlinkSync(media)
                            reply(mess.error.api)
                        })
                        .on('end', function () {
                            console.log('Finish')
                            exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                                if (error) return reply(mess.error.api)
                                xinz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, { quoted: msg })
                                fs.unlinkSync(media)
                                fs.unlinkSync(`./sticker/${sender}.webp`)
                                fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
                            })
                        })
                        .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                        .toFormat('webp')
                        .save(`./sticker/${sender}.webp`)
                } else if ((isVideo && msg.message.videoMessage.fileLength < 10000000 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    exif.create(packname1, author1, `stickwm_${sender}`)
                    reply(mess.wait)
                    await ffmpeg(`${media}`)
                        .inputFormat(media.split('.')[4])
                        .on('start', function (cmd) {
                            console.log(`Started : ${cmd}`)
                        })
                        .on('error', function (err) {
                            console.log(`Error : ${err}`)
                            fs.unlinkSync(media)
                            let tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                            reply(mess.error.api)
                        })
                        .on('end', function () {
                            console.log('Finish')
                            exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                                if (error) return reply(mess.error.api)
                                xinz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, { quoted: msg })
                                fs.unlinkSync(media)
                                fs.unlinkSync(`./sticker/${sender}.webp`)
                                fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
                            })
                        })
                        .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                        .toFormat('webp')
                        .save(`./sticker/${sender}.webp`)
                } else if (isQuotedSticker) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    exif.create(packname1, author1, `takestick_${sender}`)
                    exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                        if (error) return reply(mess.error.api)
                        xinz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, { quoted: msg })
                        fs.unlinkSync(media)
                        fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
                    })
                } else {
                    reply(`Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
            }
                break
            case prefix + 'toimg':
            case prefix + 'tomedia': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (!isQuotedSticker) return reply('Reply stiker nya')
                let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                let media = await xinz.downloadAndSaveMediaMessage(encmedia)
                if (quotedMsg.stickerMessage.isAnimated === true) {
                    reply(`Blum support sticker gif :/`)
                } else {
                    reply(mess.wait)
                    let ran = getRandom('.png')
                    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return reply('Gagal :V')
                        xinz.sendMessage(from, fs.readFileSync(ran), image, { quoted: msg, caption: 'NIH' })
                        limitAdd(sender, limit)
                        fs.unlinkSync(ran)
                    })
                }
            }
                break
            case prefix + 'attp': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}attp* teks`)
                let ane = await getBuffer(`https://api.xteam.xyz/attp?file&text=${q}`)
                fs.writeFileSync('./sticker/attp.webp', ane)
                exec(`webpmux -set exif ./sticker/data.exif ./sticker/attp.webp -o ./sticker/attp.webp`, async (error) => {
                    if (error) return reply(mess.error.api)
                    xinz.sendMessage(from, fs.readFileSync(`./sticker/attp.webp`), sticker, { quoted: msg })
                    limitAdd(sender, limit)
                    fs.unlinkSync(`./sticker/attp.webp`)
                })
            }
                break             
            case prefix + 'tinyurl':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}tinyurl link`)
                if (!isUrl(args[1])) return reply(`Masukkan link yang benar`)
                axios.get(`https://tinyurl.com/api-create.php?url=${args[1]}`)
                    .then((a) => reply(`Nih ${a.data}`))
                    .catch(() => reply(`Error, harap masukkan link dengan benar`))
                break  
            case prefix + 'codetext':
            case prefix + 'qrcode':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                   await getBuffer(`https://api.lolhuman.xyz/api/qrcode?apikey=${lolkey}&text=${q}`)
                   .then( res => {
                xinz.sendMessage(from, res, image, { quoted: msg, caption: `nih kak`})
                   })
            break 
            case prefix + 'amongus': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}amongus* teks`)
                let ane = await getBuffer(`https://api.lolhuman.xyz/api/amongus?apikey=${lolkey}&text=${q}`)
                fs.writeFileSync('./sticker/among.webp', ane)
                exec(`webpmux -set exif ./sticker/data.exif ./sticker/among.webp -o ./sticker/among.webp`, async (error) => {
                    if (error) return reply(mess.error.api)
                    xinz.sendMessage(from, fs.readFileSync(`./sticker/among.webp`), sticker, { quoted: msg })
                    limitAdd(sender, limit)
                    fs.unlinkSync(`./sticker/among.webp`)
                })
            }
                break 
           case prefix+'imgtourl':{
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    let toBase64 = media.toString('base64')
                    let upload = await require("../lib/upToTuru")(toBase64)
                    await reply(`${upload.image.image.url}`)
                    limitAdd(sender, limit)
                } else {
                    reply(`Kirim gambar atau reply gambar dengan caption ${command}`)
                }
            }
                break                                                                             
            //------------------< NULIS >---------------------
            case prefix+'nulis':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}nulis* teks`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.zeks.xyz/api/nulis?apikey=apivinz&text=${q}`, 'Jangan mager kak:v', msg)
                .catch(() => reply(mess.error.api))
                }
                break            
           case prefix + 'nuliskiri': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}nuliskiri* teks`)
                reply(mess.wait)
                const tulisan = body.slice(11)
                const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
                spawn('convert', [
                    './media/nulis/images/buku/sebelumkiri.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '22',
                    '-interline-spacing',
                    '2',
                    '-annotate',
                    '+140+153',
                    fixHeight,
                    './media/nulis/images/buku/setelahkiri.jpg'
                ])
                    .on('error', () => reply(mess.error.api))
                    .on('exit', () => {
                        xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkiri.jpg'), image, { quoted: msg, thumbnail: Buffer.alloc(0), caption: `Jangan malas pak...` })
                        limitAdd(sender, limit)
                    })
            }
                break
            case prefix + 'nuliskanan': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}nuliskanan* teks`)
                reply(mess.wait)
                const tulisan = body.slice(12)
                const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
                spawn('convert', [
                    './media/nulis/images/buku/sebelumkanan.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '2',
                    '-annotate',
                    '+128+129',
                    fixHeight,
                    './media/nulis/images/buku/setelahkanan.jpg'
                ])
                    .on('error', () => reply(mess.error.api))
                    .on('exit', () => {
                        xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkanan.jpg'), image, { quoted: msg, thumbnail: Buffer.alloc(0), caption: `Jangan malas pak...` })
                        limitAdd(sender, limit)
                    })
            }
                break
           case prefix + 'foliokiri': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}foliokiri* teks`)
                reply(mess.wait)
                const tulisan = body.slice(11)
                const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
                spawn('convert', [
                    './media/nulis/images/folio/sebelumkiri.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '1720x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '4',
                    '-annotate',
                    '+48+185',
                    fixHeight,
                    './media/nulis/images/folio/setelahkiri.jpg'
                ])
                    .on('error', () => reply(mess.error.api))
                    .on('exit', () => {
                        xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkiri.jpg'), image, { quoted: msg, thumbnail: Buffer.alloc(0), caption: `Jangan malas pak...` })
                        limitAdd(sender, limit)
                    })
            }
                break
            case prefix + 'foliokanan': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}foliokanan* teks`)
                reply(mess.wait)
                const tulisan = body.slice(12)
                const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
                spawn('convert', [
                    './media/nulis/images/folio/sebelumkanan.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '3',
                    '-annotate',
                    '+89+190',
                    fixHeight,
                    './media/nulis/images/folio/setelahkanan.jpg'
                ])
                    .on('error', () => reply(mess.error.api))
                    .on('exit', () => {
                        xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkanan.jpg'), image, { quoted: msg, thumbnail: Buffer.alloc(0), caption: `Jangan malas pak...` })
                        limitAdd(sender, limit)
                    })
            }
                break
            //------------------< Text Marker >-------------------
            case prefix + 'hartacustom':
            case prefix + 'tahtamaker':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                xinz.sendImage(from, await getBuffer(`https://api.lolhuman.xyz/api/hartacustom?apikey=${lolkey}&text=${q}`), '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break                
            case prefix + 'thundername': case prefix + 'thunder':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.lolhuman.xyz/api/textprome/thunder?apikey=${lolkey}&text=${q}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break

            case prefix + 'freefire': case prefix + 'fflogo':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)

                await getBuffer(`https://api.lolhuman.xyz/api/ephoto1/freefire?apikey=${lolkey}&text=${q}`)
                .then( res => {
                xinz.sendMessage(from, res, image, { quoted: msg, thumbnail: Buffer.alloc(0) })
                limitAdd(sender, limit)
                })
                break
            case prefix + 'horor': case prefix + 'hororblod': 
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                xinz.sendImage(from, await getBuffer(`https://api.lolhuman.xyz/api/horrorblood?apikey=${lolkey}&text=${q}`), '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break   
            case prefix + 'jokerlogo': case prefix + 'jklogo':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                await getBuffer(`https://api.lolhuman.xyz/api/textprome/jokerlogo?apikey=${lolkey}&text=${q}`)
                .then( res => {
                xinz.sendMessage(from, res, image, { quoted: msg, thumbnail: Buffer.alloc(0) })
                })
                limitAdd(sender, limit)
                break  
            case prefix + 'magma':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                await getBuffer(`https://api.lolhuman.xyz/api/textprome/magma?apikey=${lolkey}&text=${q}`)
                .then( res => {
                xinz.sendMessage(from, res, image, { quoted: msg, thumbnail: Buffer.alloc(0) })
                })
                limitAdd(sender, limit)
                break                
            case prefix + 'grafity':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                await getBuffer(`https://api.lolhuman.xyz/api/textprome/wonderfulgraffiti?apikey=${lolkey}&text=${q}`)
                .then( res => {
                xinz.sendMessage(from, res, image, { quoted: msg, thumbnail: Buffer.alloc(0) })
                })
                limitAdd(sender, limit)
                break
            case prefix+'blackpink': case prefix+'bp':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.zeks.xyz/api/logobp?apikey=apivinz&text=${q}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'glitch': case prefix+'glitchtext':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text1|text2`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} text1|text2`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.zeks.xyz/api/gtext?apikey=apivinz&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'neon': case prefix+'neontext':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.zeks.xyz/api/bneon?apikey=apivinz&text=${q}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'harta': case prefix+'hartatahta': case prefix+'tahta':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply('[❗] Hirti Tihti Tai Anjg :v')
                xinz.sendImage(from, await getBuffer(`https://api.zeks.xyz/api/hartatahta?apikey=apivinz&text=${q}`), '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'pornhub': case prefix+'phlogo':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text1|text2`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} text1|text2`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.zeks.xyz/api/phlogo?apikey=apivinz&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break                
            //------------------< Math Random >-------------------
         
            case prefix + 'ganteng':
                if (!isGroup) return reply(mess.OnlyGrup)
                var kamu = groupMembers
                var cinta = groupMembers
                var aku = cinta[Math.floor(Math.random() * kamu.length)]
                var cintax = kamu[Math.floor(Math.random() * cinta.length)]
                let tejs = `Cowok paling ganteng di group ini adalah\n*@${aku.jid.split('@')[0]}*`
                mentions(tejs, [aku.jid, cintax.jid], true)
                break
            case prefix + 'cantik':
                if (!isGroup) return reply(mess.OnlyGrup)
                var kamu = groupMembers
                var cinta = groupMembers
                var aku = cinta[Math.floor(Math.random() * kamu.length)]
                var cintax = kamu[Math.floor(Math.random() * cinta.length)]
                let gejs = `Cewek️ paling cantik di group ini adalah\n*@${cintax.jid.split('@')[0]}*`
                mentions(gejs, [aku.jid, cintax.jid], true)
                break
            case prefix + 'jadian':
                if (!isGroup) return reply(mess.OnlyGrup)
                var kamu = groupMembers
                var cinta = groupMembers
                var aku = cinta[Math.floor(Math.random() * kamu.length)]
                var cintax = kamu[Math.floor(Math.random() * cinta.length)]
                let vejs = `Ciee.. yang lagi jadian\n*@${aku.jid.split('@')[0]}* ♥️ @${cintax.jid.split('@')[0]}\nSemoga Langgeng Hii`
                mentions(vejs, [aku.jid, cintax.jid], true)
                break
            case prefix + 'seberapagay':
                axios.get(`https://arugaz.herokuapp.com/api/howgay`).then(res => res.data).then(res =>
                    textImg(`Nih Liat Data Gay Si ${q}

                Persentase Gay : ${res.persen}%
                Alert!!! : ${res.desc}`))
                break
            case prefix + 'bisakah':
                const bisa = ['Tentu Saja Bisa! Kamu Adalah Orang Paling Homky', 'Gak Bisa Ajg Aowkwowk', 'Hmm Gua Gak Tau Yaa, tanya ama bapakau', 'Ulangi Tod Gua Ga Paham']
                const keh = bisa[Math.floor(Math.random() * bisa.length)]
                xinz.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + keh, text, { quoted: msg })
                break
            case prefix + 'kapankah':
                const kapan = ['Besok', 'Lusa', 'Tadi', '4 Hari Lagi', '5 Hari Lagi', '6 Hari Lagi', '1 Minggu Lagi', '2 Minggu Lagi', '3 Minggu Lagi', '1 Bulan Lagi', '2 Bulan Lagi', '3 Bulan Lagi', '4 Bulan Lagi', '5 Bulan Lagi', '6 Bulan Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi', '5 Tahun Lagi', '6 Tahun Lagi', '1 Abad lagi', '3 Hari Lagi']
                const koh = kapan[Math.floor(Math.random() * kapan.length)]
                xinz.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + koh, text, { quoted: msg })
                break

            case prefix + 'apakah':
                const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Ulangi bro gak paham']
                const kah = apa[Math.floor(Math.random() * apa.length)]
                xinz.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + kah, text, { quoted: msg })
                break

            case prefix + 'rate':
                const ra = ['4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39']
                const te = ra[Math.floor(Math.random() * ra.length)]
                xinz.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + te + '%', text, { quoted: msg })
                break

            case prefix + 'hobby':
                const hob = ['Desah Di Game', 'Ngocokin Doi', 'Stalking sosmed nya mantan', 'Kau kan gak punya hobby awokawok', 'Memasak', 'Membantu Atok', 'Mabar', 'Nobar', 'Sosmedtan', 'Membantu Orang lain', 'Nonton Anime', 'Nonton Drakor', 'Naik Motor', 'Nyanyi', 'Menari', 'Bertumbuk', 'Menggambar', 'Foto fotoan Ga jelas', 'Maen Game', 'Berbicara Sendiri']
                const by = hob[Math.floor(Math.random() * hob.length)]
                xinz.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + by, text, { quoted: msg })
                break
            case prefix + 'tantangan':
                let imgke = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
                                      const buttons1 = [
                            {buttonId: prefix+'truth', buttonText: {displayText: 'Truth 😝'}, type: 1},
                            {buttonId: prefix+'dare', buttonText: {displayText: 'Dare 😇'}, type: 1}
                                       ]
                sendButloc(from, `Halo kak @${sender.split("@")[0]}\nmau maen game tantangan ? harus di selesain ya kan tantangannya 😅`, `Silahkan pilih tantangan di bawah kak`, imgke, buttons1)
                break
            case prefix + 'truth':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                const trut = ['Pernah suka sama siapa aja? berapa lama?', 'Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)', 'apa ketakutan terbesar kamu?', 'pernah suka sama orang dan merasa orang itu suka sama kamu juga?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'pernah gak nyuri uang nyokap atau bokap? Alesanya?', 'hal yang bikin seneng pas lu lagi sedih apa', 'pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?', 'pernah jadi selingkuhan orang?', 'hal yang paling ditakutin', 'siapa orang yang paling berpengaruh kepada kehidupanmu', 'hal membanggakan apa yang kamu dapatkan di tahun ini', 'siapa orang yang bisa membuatmu sange', 'siapa orang yang pernah buatmu sange', '(bgi yg muslim) pernah ga solat seharian?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'suka mabar(main bareng)sama siapa?', 'pernah nolak orang? alasannya kenapa?', 'Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget', 'pencapaian yang udah didapet apa aja ditahun ini?', 'kebiasaan terburuk lo pas di sekolah apa?']
                const ttrth = trut[Math.floor(Math.random() * trut.length)]
                xinz.sendImage(from, await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`), 'Truth\n\n' + ttrth, msg)
                break

            case prefix + 'dare':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                const dare = ['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot 🤥 setiap ngetik di gc/pc selama 1 hari', 'kirim voice note bilang can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you', 'prank chat mantan dan bilang " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
                const der = dare[Math.floor(Math.random() * dare.length)]
                xinz.sendImage(from, await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`), 'Dare\n\n' + der, msg)
                break
            case prefix + 'cekbapak': // By Ramlan ID
                const bapak = ['Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda', 'Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v', 'Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : Ramlan ID']
                const cek = bapak[Math.floor(Math.random() * bapak.length)]
                xinz.sendMessage(from, cek, text, { quoted: msg })
                break             
              
            //------------------< Random cok >---------------------
                            
            case prefix + 'wallpaper':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                reply(mess.wait)
                 await getBuffer(`https://api.lolhuman.xyz/api/random2/wallpaper?apikey=${lolkey}`)
                 .then( res => {
                 xinz.sendMessage(from, res, image, { quoted: msg, thumbnail: Buffer.alloc(0) })
                })
                                limitAdd(sender, limit)
            break  
            case prefix + 'bts':
            case prefix + 'plastik':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                reply(`Tunggu Bot masih mengunduh plastik`)
                 await getBuffer(`https://api.lolhuman.xyz/api/random/bts?apikey=${lolkey}`)
                 .then( res => {
                 xinz.sendMessage(from, res, image, { quoted: msg, thumbnail: Buffer.alloc(0), caption: `Buanglah plastik ke tempatnya`})
                })
                                limitAdd(sender, limit)
            break
            case prefix + 'hentai':
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)            
                reply(mess.wait)
                 await getBuffer(`https://api.lolhuman.xyz/api/random/nsfw/ahegao?apikey=${lolkey}`)
                 .then( res => {
                 xinz.sendMessage(from, res, image, { quoted: msg, thumbnail: Buffer.alloc(0) })
                })
                                limitAdd(sender, limit)
           
				break 
			case prefix + 'pantun':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)			     
                 var meng =  await fetchJson(`https://api.lolhuman.xyz/api/random/pantun?apikey=${lolkey}`)    
                 reply(`${meng.result}`)
                 limitAdd(sender, limit)
                 break
			case prefix + 'katabijak':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)			     
                 var meng =  await fetchJson(`https://api.lolhuman.xyz/api/random/katabijak?apikey=${lolkey}`)    
                 reply(`${meng.result}`)
                 limitAdd(sender, limit)
                 break                  	  			                                                           
            //------------------< Baileys >---------------------
            case prefix+'getpp':
            case prefix+'getpic':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} @tag atau 'group'`)
                if (args[1] === 'group'){
                    reply(mess.wait)
                    try {
                        var pic = await xinz.getProfilePicture(from)
                    } catch {
                        var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                    }
                    xinz.sendImage(from, await getBuffer(pic), 'Nih bang', msg)
                    limitAdd(sender, limit)
                } else if (mentioned.length !== 0){
                    reply(mess.wait)
                    try {
                        var pic = await xinz.getProfilePicture(mentioned[0])
                    } catch {
                        var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                    }
                    xinz.sendImage(from, await getBuffer(pic), 'Nih bang', msg)
                    limitAdd(sender, limit)
                } else {
                    reply(`Penggunaan ${command} @tag atau 'group'`)
                }
                break            
            case prefix + 'tagme':
                mentions(`@${sender.split("@")[0]}`, [sender], true)
                break
            case prefix + 'kontak':
                if (args.length < 2) return reply(`Penggunaan ${command} nomor|nama`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} nomor|nama`)
                if (isNaN(q.split("|")[0])) return reply(`Penggunaan ${command} nomor|nama`)
                xinz.sendContact(from, q.split("|")[0], q.split("|")[1], msg)
                break
            case prefix+'kontag':{
                let arr = [];
                for (let i of groupMembers){
                    arr.push(i.jid)
                }
                if (!isGroupAdmins && !isPremium)return reply(mess.GrupAdmin)
                if (args.length < 2) return reply(`Penggunaan ${command} nomor|nama`)
                if (!q.includes("|")) return reply(`Penggunaan ${command} nomor|nama`)
                if (isNaN(q.split("|")[0])) return reply(`Penggunaan ${command} nomor|nama`)
                xinz.sendContact(from, q.split("|")[0], q.split("|")[1], null, {contextInfo: {"mentionedJid": arr}})
                }
                break                
            case prefix + 'hidetag': {
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
                if (args.length < 2) return reply(`Masukkan text`)
                let arr = [];
                for (let i of groupMembers) {
                    arr.push(i.jid)
                }
                mentions(q, arr, false)
            }
                break
           case prefix+'fakehidetag':{
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
                if (args.length < 2) return reply(`Example ${command} @tag|teks`)
                var pe = body.slice(13)
                var org = pe.split("|")[0] 
                var tks = pe.split("|")[1]
                if (!org.startsWith('@')) return reply('Tag orangnya')
                let arrr = [];
                for (let i of groupMembers){
                    arrr.push(i.jid)
                }
                xinz.sendMessage(from, tks, text, { contextInfo: { mentionedJid: arrr }, quoted: { key: { fromMe: false, participant: `${mentionUser}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${prefix}hidetag ${tks}` }}})
                }
                break
            case prefix+'fitnah':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (args.length < 2) return reply(`Kirim perintah *${command}* @tag|pesantarget|pesanbot`)
                var org = q.split("|")[0]
                var target = q.split("|")[1];
                var bot = q.split("|")[2];
                if (!org.startsWith('@')) return reply('Tag orangnya')
                if (!target) return reply(`Masukkan pesan target!`)
                if (!bot) return reply(`Masukkan pesan bot!`)
                xinz.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${mentioned[0]}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}, contextInfo: { mentionedJid: parseMention(q)}})
                break 
            case prefix+'beban':{
                textImg(`Jangan gitu kak kasian dia di hina mulu, kalau jadi gue sih sama tak hina`)
                }
            break
                                                   
            //------------------< INFO >-------------------
            case prefix+'rules':{
                 reply(rules(prefix, sender))
                 }
                 break   
            case prefix + 'limit': case prefix + 'ceklimit': case prefix + 'balance': case prefix + 'glimit':
                if (mentioned.length !== 0) {
                    textImg(`Limit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : `${getLimit(mentioned[0], limitCount, limit)}/${limitCount}`}\nLimit Game : ${cekGLimit(mentioned[0], gcount, glimit)}/${gcount}\nBalance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                } else {
                    textImg(`Limit : ${isPremium ? 'Unlimited' : `${getLimit(sender, limitCount, limit)}/${limitCount}`}\nLimit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}\nBalance : $${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                }
                break
            case prefix+ 'creator':
            case prefix + 'owner':{
                                xinz.sendContact(from, ownerNumber.split("@")[0], ownerName, {quoted: fakeTroli}) 
                           await sleep(1000)   
const buttons = [
  {buttonId: prefix+'sc', buttonText: {displayText: 'Sc Bot️'}, type: 1},
  {buttonId: prefix+'dinatayt', buttonText: {displayText: 'Yutube'}, type: 1}
]
let culek =` Ya kak Butuh info owner saya ?`
const buttonMessage = {
    contentText: culek,
    footerText: `${fakeButons}`,
    buttons: buttons,
    headerType: 1
}

xinz.sendMessage(from, buttonMessage, MessageType.buttonsMessage, {quoted: res })
}                
            break
            case prefix + 'dinatayt':
            case prefix + 'cenelbotdinata':{
                 textImg(`Cenel dinata Bot https://youtu.be/mcZSzt3a_q0`)
                 }
            break
            case prefix + 'totaluser':
            case prefix + 'botuser':{
                 textImg(`Total user ${botName} adalah *${pendaftar.length}*`)
                 }
            break 
            case prefix+'sc':
            case prefix+'sourcecode':
                 textImg(`Bot ini menggunakan sc ya dak tahu saya kok tanyak saya😅😅`)
                 break    
            case prefix + 'ping':
            case prefix + 'speed': {
                let timestamp = speed();
                let latensi = speed() - timestamp
                textImg(`「 *𝙎𝙋𝙀𝙀𝘿 𝙏𝙀𝙎𝙏* 」\nMerespon dalam ${latensi.toFixed(4)} Second`)
            }
                break
            case prefix + 'donate': case prefix + 'donasi':
                textImg(setting.txtDonasi)
                break
            case prefix + 'runtime':
                textImg(`「 *𝙍𝙐𝙉𝙏𝙄𝙈𝙀 𝘽𝙊𝙏* 」\n${runtime(process.uptime())}`)
                break
            case prefix + 'stats':
            case prefix + 'botstat': {
                let totalchat = await xinz.chats.all()
                let i = []
                let giid = []
                for (let mem of totalchat) {
                    i.push(mem.jid)
                }
                for (let id of i) {
                    if (id && id.includes('g.us')) {
                        giid.push(id)
                    }
                }
                let timestampi = speed();
                let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = xinz.user.phone
                let anu = process.uptime()
                let teskny = `━━ *「  STATUS BOT  」* ━━

*V. Whatsapp :* ${wa_version}
*Baterai :* ${xinz.baterai.baterai}%
*Charge :* ${xinz.baterai.cas === 'true' ? 'Ya' : 'Tidak'}
*RAM :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*MCC :* ${mcc}
*MNC :* ${mnc}
*Versi OS :* ${os_version}
*Merk HP :* ${device_manufacturer}
*Versi HP :* ${device_model}
*Group Chat :* ${giid.length}
*Personal Chat :* ${totalchat.length - giid.length}
*Total Chat :* ${totalchat.length}
*Speed :* ${latensii.toFixed(4)} Second
*Runtime :* ${runtime(anu)}`
                reply(teskny)
            }
                break
                   case prefix+'infobot': {
               let totalchat = await xinz.chats.all()
                let i = []
                let giid = []
                for (let mem of totalchat) {
                    i.push(mem.jid)
                }
                for (let id of i) {
                    if (id && id.includes('g.us')) {
                        giid.push(id)
                    }
                }
                let timestampi = speed();
                let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = xinz.user.phone
                let anu = process.uptime()
                let caption = `Creator by RezaDinata`
                let teskny = `${infobot(botName, pendaftar)}

_*Special Thanks To :*_
• *Dinataa*
• *Aqulz*
• *Ardy*
• *Ivanz*
• *Fardan*
• *Penyedia Rest Api*`

let buttons = [
  {buttonId: prefix+'patnert', buttonText: {displayText: 'Patnert Bot'}, type: 1}
]
sendButImage(from, teskny, caption, fs.readFileSync('./media/din.jpg'), buttons, {quoted: msg, contextInfo:{mentionedJid: [ownerNumber, botNumber]}})
}
                break       
            //------------------< Downloader >-------------------
            case 'anjay': case 'Anjay':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                let son = fs.readFileSync('./media/sound/Anjay.m4a')
                xinz.sendMessage(from, son, audio, { quoted: msg, mimeType: 'audio/mp4', ptt:true})              
                limitAdd(sender, limit)
                }
                break 
            case prefix + 'ytmp4': {
                if (!isPremium) return reply(mess.OnlyPrem)
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}ytmp4 [linkYt]*`)
                let isLinks2 = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks2) return reply(mess.error.Iv)
                try {
                    reply(mess.wait)
                    ytv(args[1])
                        .then((res) => {
                            const { dl_link, thumb, title, filesizeF, filesize } = res
                            axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                .then((a) => {
                                    if (Number(filesize) >= 40000) return sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Title : ${title}
❐ Ext : MP4
❐ Filesize : ${filesizeF}
❐ Link : ${a.data}
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
                                    const captionsYtmp4 = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Title : ${title}
❐ Ext : MP4
❐ Size : ${filesizeF}

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                    sendFileFromUrl(from, thumb, captionsYtmp4, msg)
                                    sendFileFromUrl(from, dl_link, '', msg)
                                    limitAdd(sender, limit)
                                })
                        })
                        .catch((err) => reply(`${err}`))
                } catch (err) {
                    sendMess(ownerNumber, 'Ytmp4 Error : ' + err)
                    console.log(color('[Ytmp4]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
   /*     case prefix+'mediafire': //nyolong punya iky
               if (!isPremium) return reply(mess.only.premium)
               if (args.length < 1) return reply('Link Nya Mana? ')
               if(!isUrl(args[0]) && !args[0].includes('mediafire')) return reply(mess.error.Iv)
               reply(mess.wait)
               teks = args.join(' ')
               res = await mediafireDl(teks)
               result = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *MEDIAFIRE DOWNLOAD*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Nama : ${res[0].nama}
❐ Ukuran : ${res[0].size}
❐ Link : ${res[0].link}

_*Tunggu Proses Upload Media......*_`
             reply(result)
             sendFileFromUrl(res[0].link, document, {mimetype: res[0].mime, filename: res[0].nama, quoted: msg})
             break    */           
            case prefix + 'ytmp3': {
                if (!isPremium) return reply(mess.OnlyPrem)
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}ytmp3 [linkYt]*`)
                let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks) return reply(mess.error.Iv)
                try {
                    reply(mess.wait)
                    yta(args[1])
                        .then((res) => {
                            const { dl_link, thumb, title, filesizeF, filesize } = res
                            axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                .then((a) => {
                                    if (Number(filesize) >= 30000) return sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Title : ${title}
❐ Ext : MP3
❐ Filesize : ${filesizeF}
❐ Link : ${a.data}
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
                                    const captions = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Title : ${title}
❐ Ext : MP3
❐ Size : ${filesizeF}

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                    sendFileFromUrl(from, thumb, captions, msg)
                                    sendFileFromUrl(from, dl_link, '', msg)
                                    limitAdd(sender, limit)
                                })
                        })
                        .catch((err) => reply(`${err}`))
                } catch (err) {
                    sendMess(ownerNumber, 'Ytmp3 Error : ' + err)
                    console.log(color('[Ytmp3]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix + 'playmp4': {
                if (!isPremium) return reply(mess.OnlyPrem)
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}playmp4 query*`)
                try {
                    reply(mess.wait)
                    let yut = await yts(q)
                    ytv(yut.videos[0].url)
                        .then((res) => {
                            const { dl_link, thumb, title, filesizeF, filesize } = res
                            axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                .then((a) => {
                                    if (Number(filesize) >= 40000) return sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Title : ${title}
❐ Ext : MP4
❐ Filesize : ${filesizeF}
❐ ID : ${yut.videos[0].videoId}
❐ Upload : ${yut.videos[0].ago}
❐ Ditonton : ${yut.videos[0].views}
❐ Duration : ${yut.videos[0].timestamp}
❐ Link : ${a.data}
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
                                    const captionisu = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Title : ${title}
❐ Ext : MP4
❐ Size : ${filesizeF}
❐ ID : ${yut.videos[0].videoId}
❐ Upload : ${yut.videos[0].ago}
❐ Ditonton : ${yut.videos[0].views}
❐ Duration : ${yut.videos[0].timestamp}	
❐ URL : ${yut.videos[0].url}

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                    sendFileFromUrl(from, thumb, captionisu, msg)
                                    sendFileFromUrl(from, dl_link, '', msg)
                                    limitAdd(sender, limit)
                                })
                        })
                        .catch((err) => reply(`${err}`))
                } catch (err) {
                    sendMess(ownerNumber, 'PlayMp4 Error : ' + err)
                    console.log(color('[PlayMp4]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix + 'play': case prefix + 'playmp3': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}play query*`)
                try {
                    reply(mess.wait)
                    let yut = await yts(q)
                    yta(yut.videos[0].url)
                        .then((res) => {
                            const { dl_link, thumb, title, filesizeF, filesize } = res
                            axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                .then((a) => {
                                    if (Number(filesize) >= 30000) return sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Title : ${title}
❐ Ext : MP3
❐ Filesize : ${filesizeF}
❐ ID : ${yut.videos[0].videoId}
❐ Upload : ${yut.videos[0].ago}
❐ Ditonton : ${yut.videos[0].views}
❐ Duration : ${yut.videos[0].timestamp}
❐ Link : ${a.data}
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
                                    const captionis = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Title : ${title}
❐ Ext : MP3
❐ Size : ${filesizeF}
❐ ID : ${yut.videos[0].videoId}
❐ Upload : ${yut.videos[0].ago}
❐ Ditonton : ${yut.videos[0].views}
❐ Duration : ${yut.videos[0].timestamp}
❐ URL : ${yut.videos[0].url}

_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                    sendFileFromUrl(from, thumb, captionis, msg)
                                    sendFileFromUrl(from, dl_link, '', msg)
                                    limitAdd(sender, limit)
                                })
                        })
                        .catch((err) => reply(`${err}`))
                } catch (err) {
                    sendMess(ownerNumber, 'PlayMp3 Error : ' + err)
                    console.log(color('[PlayMp3]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix + 'ig':
            case prefix + 'igdl':
            case prefix + 'instagram': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}ig* link ig`)
                if (!isUrl(args[1]) && !args[1].includes('instagram.com')) return reply(mess.error.Iv)
                reply(mess.wait)
                getPost(args[1].split('/')[4])
                    .then((res) => {
                        let { owner_user, post, date, capt } = res
                        let caption = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *INSTAGRAM MEDIA*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Owner : ${owner_user}
❐ Jumlah Media : ${post.length}
❐ Caption :${capt}

_Harap tunggu sebentar, media akan segera dikirim_`
                        sendMess(from, caption)
                        for (let i = 0; i < post.length; i++) {
                            sendFileFromUrl(from, post[i].url)
                        }
                        limitAdd(sender, limit)
                    })
                    .catch((err) => {
                        sendMess(ownerNumber, 'IG Download Error : ' + err)
                        console.log(color('[IG Download]', 'red'), err)
                        reply(mess.error.api)
                    })
            }
                break
            case prefix + 'fb':
            case prefix + 'fbdl':
            case prefix + 'facebook': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}fb* url`)
                if (!isUrl(args[1]) && !args[1].includes('facebook.com')) return reply(mess.error.Iv)
                reply(mess.wait)
                fbdl(args[1])
                    .then((res) => {
                        sendFileFromUrl(from, res.result.links[0].url)
                        limitAdd(sender, limit)
                    })
                    .catch((err) => {
                        sendMess(ownerNumber, 'FB Error : ' + err)
                        console.log(color('[FB]', 'red'), err)
                        reply(mess.error.api)
                    })
            }
                break
            case prefix + 'yts':
            case prefix + 'ytsearch': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}ytsearch* _query_`)
                reply(mess.wait)
                yts(q)
                    .then((res) => {
                        let yt = res.videos
                        let txt = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE SEARCH*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
*Hasil Pencarian : ${q}*\n`
                        for (let i = 0; i < 10; i++) {
                            txt += `\n─────────────────\n\n❐ Judul : ${yt[i].title}\n❐ ID : ${yt[i].videoId}\n❐ Upload : ${yt[i].ago}\n❐ Ditonton : ${yt[i].views}\n❐ Duration : ${yt[i].timestamp}\n❐ URL : ${yt[i].url}\n`
                        }
                        sendFileFromUrl(from, yt[0].image, txt, msg)
                        limitAdd(sender, limit)
                    })
                    .catch((err) => {
                        sendMess(ownerNumber, 'YT SEARCH Error : ' + err)
                        console.log(color('[YT SEARCH]', 'red'), err)
                        reply(mess.error.api)
                    })
            }
                break
            case prefix + 'tiktok': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} link tiktok`)
                if (!isUrl(args[1]) && !args[1].includes('tiktok.com')) return reply(mess.error.Iv)
                reply(mess.wait)
                axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=${lolkey}&url=${args[1]}`)
                    .then(({ data }) => {
                        let { title, thumbnail, description, duration, link } = data.result
                        let capt = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ TIKTOK NOWM DOWNLOADER
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

Data Berhasil Didapatkan!
❐ Title : ${title}
❐ Ext : MP4
❐ Username / Nickname : ${data.result.author.username} / ${data.result.author.nickname}
❐ Duration : ${duration}
❐ LikeCount : ${data.result.statistic.diggCount}
❐ ShareCount : ${data.result.statistic.shareCount}
❐ CommentCount : ${data.result.statistic.commentCount}
❐ PlayCount : ${data.result.statistic.playCount}
❐ Descripttion : ${description}
`
                        sendFileFromUrl(from, thumbnail, capt, msg)
                        sendFileFromUrl(from, link, '', msg)
                        limitAdd(sender, limit)
                    })
                    .catch((err) => {
                        sendMess(ownerNumber, 'TiktokWM Error : ' + err)
                        console.log(color('[TiktokWM]', 'red'), err)
                        reply(mess.error.api)
                    })
            }
                break
                case prefix + 'gogimage':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Penggunaan ${command} text`)
                reply(mess.wait)
                await getBuffer(`https://api.lolhuman.xyz/api/gimage?apikey=${lolkey}&query=${q}`)
                .then( res => {
                xinz.sendMessage(from, res, image, { quoted: msg, thumbnail: Buffer.alloc(0) })
                })
                limitAdd(sender, limit) 
                break               
                
     
            //------------------< Stalker >-------------------
            case prefix + 'igstalk': case prefix + 'stalkig': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}igstalk* _username_`)
                reply(mess.wait)
                getUser(args[1].replace('@', ''))
                    .then((res) => {
                        let { username, biography, fullName, subscribersCount, subscribtions, highlightCount, isBusinessAccount, isPrivate, isVerified, profilePicHD, postsCount } = res
                        let caption = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *INSTAGRAM PROFILE*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Username : ${username}
❐ Fullname : ${fullName}
❐ Followers : ${subscribersCount}
❐ Following : ${subscribtions}
❐ Post Count : ${postsCount}
❐ HighlightCount : ${highlightCount}
❐ PrivateAccount : ${isPrivate ? 'Yes' : 'No'}
❐ VerifiedAccount : ${isVerified ? 'Yes' : 'No'}
❐ BusinessAccount : ${isBusinessAccount ? 'Yes' : 'No'}
❐ Biography : \n${biography}`
                        sendFileFromUrl(from, profilePicHD, caption, msg)
                        limitAdd(sender, limit)
                    })
                    .catch((err) => {
                        sendMess(ownerNumber, 'IG Stalk Error : ' + err)
                        console.log(color('[IG Stalk]', 'red'), err)
                        reply(mess.error.api)
                    })
            }
                break
            case prefix + 'ghstalk': case prefix + 'githubstalk': case prefix + 'ghuser': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}ghstalk* _username_`)
                reply(mess.wait)
                axios.get(`https://api.github.com/users/${args[1]}`)
                    .then((res) => res.data)
                    .then((res) => {
                        let { login, type, name, followers, following, created_at, updated_at, public_gists, public_repos, twitter_username, bio, hireable, email, location, blog, company, avatar_url, html_url } = res
                        let txt = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *GITHUB USER*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*
❐ Username : ${login}
❐ Name : ${name}
❐ Followers : ${followers}
❐ Following : ${following}
❐ Created at :  ${moment(created_at).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}
❐ Updated at : ${moment(updated_at).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}
❐ Public Gists : ${public_gists}
❐ Public Repos : ${public_repos}
❐ Twitter : ${twitter_username}
❐ Email : ${email}
❐ Location : ${location}
❐ Blog : ${blog}
❐ Link : ${html_url}
❐ Bio :\n${bio}`
                        sendFileFromUrl(from, avatar_url, txt, msg)
                        limitAdd(sender, limit)
                    })
                    .catch((err) => {
                        sendMess(ownerNumber, 'GH Stalk Error : ' + err)
                        console.log(color('[GH Stalk]', 'red'), err)
                        reply(mess.error.api)
                    })
            }
                break
            //------------------< VVIBU >-------------------
            case prefix + 'waifu': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                reply(mess.wait)
                axios.get('https://waifu.pics/api/sfw/waifu')
                    .then(res => res.data)
                    .then(res =>
                        sendFileFromUrl(from, res.url, 'NIH', {quoted: fakeTroli, thumbnail: Buffer.alloc(0) })
                    )
                    .catch((err) => {
                        console.log(color('[Vvibu]', 'red'), err)
                        reply(mess.error.api)
                    })
                limitAdd(sender, limit)
            }
                break
            case prefix + 'nekonime': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                reply(mess.wait)
                axios.get('https://waifu.pics/api/sfw/neko')
                    .then(res => res.data)
                    .then(res =>
                        sendFileFromUrl(from, res.url, 'NIH', msg)
                    )
                    .catch((err) => {
                        console.log(color('[Vvibu]', 'red'), err)
                        reply(mess.error.api)
                    })
                limitAdd(sender, limit)
            }
                break
            case prefix + 'megumin': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                reply(mess.wait)
                axios.get('https://waifu.pics/api/sfw/megumin')
                    .then(res => res.data)
                    .then(res =>
                        sendFileFromUrl(from, res.url, 'NIH', msg)
                    )
                    .catch((err) => {
                        console.log(color('[Vvibu]', 'red'), err)
                        reply(mess.error.api)
                    })
                limitAdd(sender, limit)
            }
                break
            case prefix + 'shinobu': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                reply(mess.wait)
                axios.get('https://waifu.pics/api/sfw/shinobu')
                    .then(res => res.data)
                    .then(res =>
                        sendFileFromUrl(from, res.url, 'NIH', msg)
                    )
                    .catch((err) => {
                        console.log(color('[Vvibu]', 'red'), err)
                        reply(mess.error.api)
                    })
                limitAdd(sender, limit)
            }
                break
            case prefix + 'loli':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.lolhuman.xyz/api/random/loli?apikey=${lolkey}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix + 'sagiri':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.lolhuman.xyz/api/random/sagiri?apikey=${lolkey}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break        
            //------------------< Premium >-------------------              
            case prefix + 'addprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
                if (mentioned.length !== 0) {
                    for (let i = 0; i < mentioned.length; i++) {
                        _prem.addPremiumUser(mentioned[0], args[2], premium)
                    }
                    reply('Sukses')
                } else {
                    _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                    reply('Sukses')
                }
                break
            case prefix + 'delprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                if (mentioned.length !== 0) {
                    for (let i = 0; i < mentioned.length; i++) {
                        premium.splice(_prem.getPremiumPosition(mentioned[i], premium), 1)
                        fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    }
                    reply('Sukses')
                } else {
                    premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                }
                break
            case prefix + 'cekprem':
            case prefix + 'cekpremium':
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                reply(premiumnya)
                break
            case prefix + 'listprem':
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium) {
                    men.push(i.id)
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*ID :* @${i.id.split("@")[0]}\n*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                }
                mentions(txt, men, true)
                break
              //------------------< sewa >-------------------
         case prefix + 'addsewa':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addsewa* linkgc waktu`)
                let ceh = await xinz.cekInviteCode(args[1].replace('https://chat.whatsapp.com/', ''))
                if (ceh.status === 200) {
                    xinz.acceptInvite(args[1].replace('https://chat.whatsapp.com/', ''))
                        .then((res) => {
                            _sewa.addSewaGroup(res.gid, args[2], sewa)
                            reply(`Bot akan segera masuk`)
                        })
                } else {
                    reply(`link salah`)
                }
                break               
            case prefix + 'delsewa':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* idgroup`)
                sewa.splice(_sewa.getSewaPosition(args[1], sewa), 1)
                fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa))
                reply(`Sukses lur`)
                break 
                           
            //------------------< BAN >-------------------            
            case prefix + 'ban':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (mentioned.length !== 0) {
                    for (let i = 0; i < mentioned.length; i++) {
                        addBanned(mentioned[0], args[2], ban)
                    }
                    reply('Sukses')
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa ban Owner`)
                    addBanned(quotedMsg.sender, args[1], ban)
                    reply(`Sukses ban target`)
                } else if (!isNaN(args[1])) {
                    addBanned(args[1] + '@s.whatsapp.net', args[2], ban)
                    reply('Sukses')
                } else {
                    reply(`Kirim perintah ${prefix}ban @tag atau nomor atau reply pesan orang yang ingin di ban`)
                }
                break
            case prefix + 'unban':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (mentioned.length !== 0) {
                    for (let i = 0; i < mentioned.length; i++) {
                        unBanned(mentioned[i], ban)
                    }
                    reply('Sukses')
                } if (isQuotedMsg) {
                    unBanned(quotedMsg.sender, ban)
                    reply(`Sukses unban target`)
                } else if (!isNaN(args[1])) {
                    unBanned(args[1] + '@s.whatsapp.net', ban)
                    reply('Sukses')
                } else {
                    reply(`Kirim perintah ${prefix}unban @tag atau nomor atau reply pesan orang yang ingin di unban`)
                }
                break
            case prefix + 'listban':
                let txtx = `List Banned\nJumlah : ${ban.length}\n\n`
                let menx = [];
                for (let i of ban) {
                    menx.push(i.id)
                    txtx += `*ID :* @${i.id.split("@")[0]}\n`
                    if (i.expired === 'PERMANENT') {
                        let cekvip = 'PERMANENT'
                        txtx += `*Expire :* PERMANENT\n\n`
                    } else {
                        let cekvip = ms(i.expired - Date.now())
                        txtx += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                    }
                }
                mentions(txtx, menx, true)
                break
            case prefix+'block':
                 if (!isOwner) return reply(mess.OnlyOwner)
                 if (mentioned.length !== 0) {
                     xinz.blockUser(mentioned[0], 'add')
                     reply('Sukses!')
                 } else if (isQuotedMsg) {
                     xinz.blockUser(quotedMsg.sender, 'add')
                     reply('Sukses!')
                 } else if (!isNaN(args[1])) {
                     xinz.blockUser(args[1] + '@c.us', 'add')
                     reply('Sukses!')
                 } else {
                     reply(`Kirim perintah ${command} @tag atau nomer atau reply pesan target!`)
                 }
                 break
            case prefix+'unblock':
                 if (!isOwner) return reply(mess.OnlyOwner)
                 if (mentioned.length !== 0) {
                     xinz.blockUser(mentioned[0], 'add')
                     reply('Sukses!')
                 } else if (isQuotedMsg) {
                     xinz.blockUser(quotedMsg.sender, 'add')
                     reply('Sukses!')
                 } else if (!isNaN(args[1])) {
                     xinz.blockUser(args[1] + '@c.us', 'add')
                     reply('Sukses!')
                 } else {
                     reply(`Kirim perintah ${command} @tag atau nomer atau reply pesan target!`)
                 }
                 break                                 
            //------------------< Game >-------------------
            case prefix+'globalbalance':{
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOPGLOBAL 」 ──*\n\n'
                let arrTop = []
                for (let i = 0; i < 50; i ++){
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
            }
                break
            case prefix+'topbalance':{
                if (!isGroup)return reply(mess.OnlyGrup)
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOPLOCAL 」 ──*\n\n'
                let arrTop = []
                let anggroup = groupMembers.map(a => a.jid)
                for (let i = 0; i < balance.length; i ++){
                    if (arrTop.length >= 10) continue
                    if (anggroup.includes(balance[i].id)) {
                        top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                        arrTop.push(balance[i].id)
                    }
                }
                mentions(top, arrTop, true)
            }
                break                
            case prefix + 'buylimit': {
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                let ane = Number(nebal(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, nebal(args[1]), limit)
                reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
                break
            case prefix+'givelimit':{
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${command}* 62xx/@tqg jumlah limit`)
                if (isNaN(args[2])) return reply('Harus berupa angka!')
                if (msg.message.extendedTextMessage != undefined) {
                var nomor = mentionUser[0].split("@")[0]
                giveLimit(nomor+'@s.whatsapp.net', nebal(args[2]), limit)
                reply('Sukses give limit sebanyak '+args[2]+' kepada @'+nomor+'')
                } else {
                var nomor = args[1]
                giveLimit(nomor+'@s.whatsapp.net', nebal(args[2]), limit)
                reply('Sukses give limit sebanyak '+args[2]+' kepada @'+nomor+'')
                }}
                break
            case prefix+'givegamelimit':{
                 if (!isOwner) return reply(mess.OnlyOwner)
                 if (args.length < 2) return reply(`Kirim perintah *${command}* 62xx/@tag jumlah limit`)
                 if (isNaN(args[2])) return reply('Harus berupa angka!')
                 if (msg.message.extendedTextMessage != undefined) {
                 var nomor = mentionUser[0].split("@")[0]
                 givegame(nomor+'@s.whatsapp.net', nebal(args[2]), glimit)
                 reply('Sukses give game limit sebanyak '+args[2]+' kepada @'+nomor+'')
                 } else {
                 var nomor = args[1]
                 givegame(nomor+'@s.whatsapp.net', nebal(args[2]), glimit)
                 reply('Sukses give game limit sebanyak '+args[2]+' kepada '+nomor+'')
                 }}
                 break                
            case prefix + 'buygamelimit':
            case prefix + 'buyglimit': {
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                let ane = Number(nebal(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                givegame(sender, nebal(args[1]), glimit)
                reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break
            case prefix + 'tictactoe': case prefix + 'ttt': case prefix + 'ttc':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                if (mentioned.length !== 0) {
                    if (mentioned[0] === sender) return reply(`Sad amat main ama diri sendiri`)
                    let h = randomNomor(100)
                    mentions(monospace(`@${sender.split('@')[0]} menantang @${mentioned[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/T) untuk bermain\n\nHadiah : ${h} balance`), [sender, mentioned[0]], false)
                    tictactoe.push({
                        id: from,
                        status: null,
                        hadiah: h,
                        penantang: sender,
                        ditantang: mentioned[0],
                        TicTacToe: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
                    })
                    gameAdd(sender, glimit)
                } else {
                    reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                }
                break
            case prefix + 'delttt':
            case prefix + 'delttc':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
                tictactoe.splice(getPosTic(from, tictactoe), 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                break
           case prefix + 'tebakgambar': {
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakGambar(from, tebakgambar)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await axios.get(`http://api.lolhuman.xyz/api/tebak/gambar?apikey=${lolkey}`)
                const petunjuk = anu.data.result.answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')
                sendFileFromUrl(from, anu.data.result.image, monospace(`Silahkan jawab soal berikut ini\n\nPetunjuk : ${petunjuk}\nWaktu : ${gamewaktu}s`), msg)
                let anih = anu.data.result.answer.toLowerCase()
                game.addgambar(from, anih, gamewaktu, tebakgambar)
                gameAdd(sender, glimit)
            }
                break
            case prefix + 'family100': {
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isfam(from, family100)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await axios.get(`http://api.lolhuman.xyz/api/tebak/family100?apikey=${lolkey}`)
                reply(`*JAWABLAH SOAL BERIKUT*\n\n*Soal :* ${anu.data.result.question}\n*Total Jawaban :* ${anu.data.result.aswer.length}\n\nWaktu : ${gamewaktu}s`)
                let anoh = anu.data.result.aswer
                let rgfds = []
                for (let i of anoh) {
                    let fefs = i.split('/') ? i.split('/')[0] : i
                    let iuhbb = fefs.startsWith(' ') ? fefs.replace(' ', '') : fefs
                    let axsf = iuhbb.endsWith(' ') ? iuhbb.replace(iuhbb.slice(-1), '') : iuhbb
                    rgfds.push(axsf.toLowerCase())
                }
                game.addfam(from, rgfds, gamewaktu, family100)
                gameAdd(sender, glimit)
            }
                break 
       case prefix+'suit': //nyolong dari zenz
const buttons = [
  {buttonId: prefix+'suit kertas', buttonText: {displayText: 'Kertas 📜️'}, type: 1},
  {buttonId: prefix+'suit batu', buttonText: {displayText: 'Batu 🗿'}, type: 1},
  {buttonId: prefix+'suit gunting', buttonText: {displayText: 'Gunting ✂️️'}, type: 1}
  
]
let culek =`Silahkan pilih suit di bawah`
const buttonMessage = {
    contentText: culek,
    footerText: `${fakeButons}`,
    buttons: buttons,
    headerType: 1
}    
              if (!q) return xinz.sendMessage(from, buttonMessage, MessageType.buttonsMessage, {quoted: msg })
              const userspilih = q
              if (!userspilih.match(/batu|gunting|kertas/)) return xinz.sendMessage(from, buttonMessage, MessageType.buttonsMessage, {quoted: msg })
              var computer = Math.random();
              if (computer < 0.34 ) {
              computer = 'batu';
              } else if( computer >= 0.34 && computer < 0.67) {
              computer = 'gunting';
              } else {
              computer = 'kertas';
}
              if ( userspilih == computer ) {
              reply(`Pertandingan Seri!`)
              } else if ( userspilih == 'batu' ) {
              if( computer == 'gunting' ) {
              reply(`Kamu memilih Batu dan bot Gunting\nKamu menang!`)
              } else {
              reply(`Kamu memilih Batu dan bot memilih Kertas\nKamu kalah!`)
}
              } else if ( userspilih == 'gunting' ) {
              if( computer == 'batu' ) {
              reply(`Kamu memilih Gunting dan bot memilih Batu\nKamu kalah!`)
              } else {
              reply(`Kamu memilih Gunting dan bot Kertas\nKamu menang!`)
}
              } else if ( userspilih == 'kertas' ) {
              if( computer == 'batu' ) {
              reply(`Kamu memilih Kertas dan bot Batu\nKamu menang!`)
              } else {
              reply(`Kamu memilih Kertas dan bot memilih Gunting\nKamu kalah`)
}
}
              break 
          case prefix+'tebaklagu':{
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakLagu(from, tebaklagu)) return reply(`Masih ada soal yang belum di selesaikan`)
                 var anuu = await fetchJson(`https://api.xteam.xyz/game/tebaklagu?apikey=${xteam}`)
                 var buff = await getBuffer(anuu.result.preview)
                 var petunjuk = anuu.result.judul.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')
                 xinz.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', ptt: true, quoted: msg})
                 .then((yan) => {
                 xinz.sendMessage(from, monospace(`Silahkan tebak judul lagu berikut ini\n\nPetunjuk : ${petunjuk}\nWaktu : ${gamewaktu}s`), text, {quoted: yan})
                 })
                 var auh = anuu.result.judul.toLowerCase()
                 game.addLagu(from, auh, gamewaktu, tebaklagu)
                 gameAdd(sender, glimit)
            }
                 break 
            case prefix+'kuis':{
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isKuisGame(from, kuis)) return reply(`Masih ada soal yang belum di selesaikan`)
                var deh = await fetchJson(`https://api.lolhuman.xyz/api/tebak/jenaka?apikey=${lolkey}`)
                var petunjuk = deh.result.answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')
                reply(monospace(`Silahkan jawab soal berikut ini\n\nSoal :${deh.result.question}\nPetunjuk : ${petunjuk}\nWaktu : ${gamewaktu}s`))
                var ahh = deh.result.answer.toLowerCase()
                game.addKuis(from, ahh, gamewaktu, kuis)
                gameAdd(sender, glimit)
            }
                 break  
                     
                                       
            //------------------< Owner >-------------------
      case prefix+'addupdate':
             if (!isOwner) return reply(mess.only.owner)
             if (!q) return reply(`Example: ${command} update fitur`)
           _update.push(q)
             fs.writeFileSync('./database/update.json', JSON.stringify(_update))
             reply(`Update fitur berhasil ditambahkan ke database!`)
             break             
      case prefix+'update':
             let updateList = `*── 「 UPDATE BOT 」 ──*\n\n\n`
             for (let i of _update) {
             updateList += `• *${i.replace(_update)}*\n\n`
}
             textImg(updateList)
             break            
            case prefix + 'setpp': case prefix + 'setppbot':
            case prefix + 'setpic': case prefix + 'setpicbot': {
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    xinz.updateProfilePicture(xinz.user.jid, media)
                        .then((res) => reply('sukses'))
                        .catch((err) => reply('emror'))
                } else {
                    reply(`Kirim gambar atau reply gambar dengan caption ${command}`)
                }
            }
                break
            case prefix + 'setname': {
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} nama\n\nContoh : ${command} xinzBot`)
                xinz.updateProfileName(q)
                    .then((res) => reply('sukses'))
                    .catch((err) => reply('emror'))
            }
                break
            case prefix+'resetlimit':
                  if (!isOwner) return reply(mess.OnlyOwner)
                  fs.writeFileSync('./database/limit.json', ('[]'))
                  fs.writeFileSync('./database/glimit.json', ('[]'))
                  textImg('Sedang proses mereset limit....')
                  await sleep(5000)
                  textImg('Sukses Reset Limit!')
                  break

                
            case prefix + 'setbio': {
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} nama\n\nContoh : ${command} ${botName}`)
                xinz.setStatus(q)
                    .then((res) => reply('sukses'))
                    .catch((err) => reply('emror'))
            }
                break
            case prefix + 'self': {
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                xinz.mode = 'self'
                textImg('Berhasil berubah ke mode self')
            }
                break
            case prefix + 'publik': case prefix + 'public': {
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                xinz.mode = 'public'
                textImg('Berhasil berubah ke mode public')
            }
                break
            case prefix + 'clearall': {
                if (!isOwner) return reply(mess.OnlyOwner)
                let chiit = await xinz.chats.all()
                for (let i of chiit) {
                    xinz.modifyChat(i.jid, 'delete', {
                        includeStarred: false
                    })
                }
                reply(`Selesai`)
            }
                break	                
            case prefix + 'setprefix':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan prefix\nOptions :\n=> multi\n=> nopref`)
                if (q === 'multi') {
                    multi = true
                    textImg(`Berhasil mengubah prefix ke ${q}`)
                } else if (q === 'nopref') {
                    multi = false
                    nopref = true
                    textImg(`Berhasil mengubah prefix ke ${q}`)
                } else {
                    multi = false
                    nopref = false
                    prefa = `${q}`
                    textImg(`Berhasil mengubah prefix ke ${q}`)
                }
                break
            case prefix + 'bcbuton':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan text`)
                     let hedehbre = [
                            {buttonId: prefix+'menubot', buttonText: {displayText: '⏪ Back to menu'}, type: 1},
                            {buttonId: prefix+'update', buttonText: {displayText: 'Update Bot'}, type: 1}
                                       ]  
                      const buttonMessagee = {
                          contentText: `*DIN- BOT BROADCAST*`,
                          footerText: `• Not : ${q}`,
                          buttons: hedehbre,
                          headerType: 1
                                     }                                                      
                let chiit = await xinz.chats.all()      
                if (isImage || isQuotedImage) {
                let bctext =`\n\n• *${botName}* Broadc •`
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    for (let i of chiit) {                   
                        sendButImage(i.jid, `*DIN- BOT BROADCAST*`, `• Not : ${q}`, media, hedehbre, {quoted: fakeTroli, contextInfo:{mentionedJid: parseMention(q) }})
                    }
                    reply(`Sukses`)
                } else if (isVideo || isQuotedVideo) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    for (let i of chiit) {
                        sendButVideo(i.jid, `*DIN- BOT BROADCAST*`, `• Not : ${q}`, video, hedehbre, {quoted: fakeTroli, contextInfo: { mentionedJid: parseMention(q) }})
                    }
                    reply(`Sukses`)
                } else {
                    for (let i of chiit) {
                       sendButloc(i.jid, `${q}`, `Jam : ${jam} Wib\nBroadcast Bot`, foto, hedehbre, {quoted: fakeTroli, contextInfo:{mentionedJid: parseMention(q) }})          
                    }
                    reply(`Sukses`)
                }
                break
            case prefix+'bc':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan text`)
                let chiitt = await xinz.chats.all()
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    for (let i of chiitt){
                        xinz.sendMessage(i.jid, media, image, {caption: q})
                    }
                    reply(`Sukses`)
                } else if (isVideo || isQuotedVideo) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    for (let i of chiitt){
                        xinz.sendMessage(i.jid, media, video, {caption: q})
                    }
                    reply(`Sukses`)
                } else {
                    for (let i of chiitt){
                        xinz.sendMessage(i.jid, q, text)
                    }
                    reply(`Sukses`)
                }
                break                
         case prefix+'restart':
             if (!isOwner) return 
             reply(mess.wait)
             exec(`node main`)
             reply('_Restarting Bot Success_')
             break        
            //------------------< G R U P >-------------------
            case prefix + 'delete':
            case prefix + 'del':
            case prefix + 'd':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isQuotedMsg) return reply(`Reply pesan dari bot`)
                if (!quotedMsg.fromMe) return reply(`Reply pesan dari bot`)
                xinz.deleteMessage(from, { id: msg.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
                break
            case prefix + 'afk':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (isAfkOn) return reply('afk sudah diaktifkan sebelumnya')
                if (body.slice(150)) return reply('Alasanlu kepanjangan')
                let reason = body.slice(5) ? body.slice(5) : 'Nothing.'
                afk.addAfkUser(sender, Date.now(), reason, _afk)
                mentions(`@${sender.split('@')[0]} sedang afk\nAlasan : ${reason}`, [sender], true)
                break
            case prefix + 'infogrup':
            case prefix + 'infogrouup':
            case prefix + 'grupinfo':
            case prefix + 'groupinfo':
                if (!isGroup) return reply(mess.OnlyGrup)
                try {
                    var pic = await xinz.getProfilePicture(from)
                } catch {
                    var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                }
                let ingfo = `*G R O U P I N F O*\n\n*Name :* ${groupName}\n*ID Grup :* ${from}\n*Dibuat :* ${moment(`${groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Owner Grup :* @${groupMetadata.owner.split('@')[0]}\n*Jumlah Admin :* ${groupAdmins.length}\n*Jumlah Peserta :* ${groupMembers.length}\n*Welcome :* ${isWelcome ? 'Aktif' : 'Mati'}\n*Left :* ${isLeft ? 'Aktif' : 'Mati'}\n*AntiLink :* ${isAntiLink ? 'Aktif' : 'Mati'}\n*AntiWame :* ${isAntiWame ? 'Aktif' : 'Mati'}\n*antiviewonce :* ${isAntiVO ? 'Aktif' : 'mati'}\n*AntiBadword :* ${isBadword ? 'Aktif' : 'Mati'}\n*Desc :* \n${groupMetadata.desc}`
                xinz.sendMessage(from, await getBuffer(pic), image, { quoted: msg, caption: ingfo, contextInfo: { "mentionedJid": [groupMetadata.owner.replace('@c.us', '@s.whatsapp.net')] } })
                break
//CASE SHARLOK BY MARCELL 
 case 'sharelock':
              if (!isGroup) return reply(mess.OnlyGrup)               
              if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)             
               let kntl = `${args.join(' ')}`
               let name = kntl.split("|")[0];
               let impostor = kntl.split("|")[1];
               xinz.sendMessage(from, {
               degreesLatitude: 999,
               degreesLongitude: 999,
               name: name,
               address: impostor,
               jpegThumbnail: foto}, MessageType.liveLocation, {quoted: fakeTroli })
               break                
            case prefix + 'add':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (isQuotedMsg && args.length < 2) {
                    xinz.groupAdd(from, [quotedMsg.sender])
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Emror'))
                } else if (args.length < 3 && !isNaN(args[1])) {
                    xinz.groupAdd(from, [args[1] + '@s.whatsapp.net'])
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Emror'))
                } else {
                    reply()
                }
                break
 case prefix + 'kick':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0) {
                    xinz.groupRemove(from, mentioned)
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Emror'))
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa kick Owner`)
                    xinz.groupRemove(from, [quotedMsg.sender])
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Emror'))
                } else if (!isNaN(args[1])) {
                    xinz.groupRemove(from, [args[1] + '@s.whatsapp.net'])
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Emror'))
                } else {
                    reply(`Kirim perintah ${prefix}kick @tag atau nomor atau reply pesan orang yang ingin di kick`)
                }
                break               
            case prefix + 'promote':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0) {
                    xinz.groupMakeAdmin(from, mentioned)
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Eror'))
                } else if (isQuotedMsg) {
                    xinz.groupMakeAdmin(from, [quotedMsg.sender])
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Eror'))
                } else if (!isNaN(args[1])) {
                    xinz.groupMakeAdmin(from, [args[1] + '@s.whatsapp.net'])
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Eror'))
                } else {
                    reply(`Kirim perintah ${prefix}promote @tag atau nomor atau reply pesan orang yang ingin di promote`)
                }
                break
            case prefix + 'demote':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0) {
                    xinz.groupDemoteAdmin(from, mentioned)
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Eror'))
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa kick Owner`)
                    xinz.groupDemoteAdmin(from, [quotedMsg.sender])
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Eror'))
                } else if (!isNaN(args[1])) {
                    xinz.groupDemoteAdmin(from, [args[1] + '@s.whatsapp.net'])
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Eror'))
                } else {
                    reply(`Kirim perintah ${prefix}demote @tag atau nomor atau reply pesan orang yang ingin di demote`)
                }
                break
            case prefix + 'linkgc': case prefix + 'linkgrup': case prefix + 'linkgroup':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                xinz.groupInviteCode(from)
                    .then((res) => reply('https://chat.whatsapp.com/' + res))
                break
            case prefix + 'leave':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                reply('bye...')
                    .then(() => xinz.groupLeave(from))
                break
            case prefix + 'setdesc':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Penggunaan ${prefix}setdesc desc`)
                xinz.groupUpdateDescription(from, q)
                    .then((res) => reply('Sukses'))
                    .catch((err) => reply('Eror'))
                break
            case prefix + 'setgrupname':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Penggunaan ${prefix}setgrupname name`)
                xinz.groupUpdateSubject(from, q)
                    .then((res) => reply('Sukses'))
                    .catch((err) => reply('Eror'))
                break
            case prefix + 'sider': case prefix + 'chatinfo':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isQuotedMsg) return reply(`Reply pesan dari bot`)
                if (!quotedMsg.fromMe) return reply(`Reply pesan dari bot`)
                xinz.messageInfo(from, msg.message.extendedTextMessage.contextInfo.stanzaId)
                    .then((res) => {
                        let anu = []
                        let txt = `*Info Chat*\n\n`
                        for (let i = 0; i < res.reads.length; i++) {
                            anu.push(res.reads[i].jid)
                            txt += `@${res.reads[i].jid.split("@")[0]}\n`
                            txt += `Waktu membaca : ${moment(`${res.reads[i].t}` * 1000).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\n\n`
                        }
                        mentions(txt, anu, true)
                    })
                    .catch((err) => reply('Eror'))
                break
            case prefix + 'opengrup':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                xinz.groupSettingChange(from, "announcement", false)
                    .then((res) => reply('Sukses'))
                    .catch((err) => reply('Eror'))
                break
            case prefix + 'closegrup':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                xinz.groupSettingChange(from, "announcement", true)
                    .then((res) => reply('Sukses'))
                    .catch((err) => reply('Eror'))
                break
            case prefix + 'setppgrup':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    xinz.updateProfilePicture(from, media)
                        .then((res) => reply('Sukses'))
                        .catch((err) => reply('Eror'))
                } else {
                    reply(`Kirim atau tag gambar dengan caption ${prefix}setppgrup`)
                }
                break
            case prefix + 'join':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}join* link grup`)
                if (!isUrl(args[1]) && !args[1].includes('chat.whatsapp.com')) return reply(mess.error.Iv)
                let code = args[1].replace('https://chat.whatsapp.com/', '')
                xinz.acceptInvite(code)
                    .then((res) => reply('Sukses'))
                    .catch((err) => reply('Eror'))
                break
            case prefix + 'tagall':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                let arr = [];
                let txti = `*[ TAG ALL ]*\n\n${q ? q : ''}\n\n`
                for (let i of groupMembers) {
                    txti += `=> @${i.jid.split("@")[0]}\n`
                    arr.push(i.jid)
                }
                mentions(txti, arr, true)
                break
    /*   case prefix+'online':
       case prefix+'listonline':         
             if (!isGroup) return reply(mess.OnlyGrup)
             try {
             let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
             let online = [...Object.keys(xinz.chats.get(ido).presences), xinz.user.jid]
             xinz.sendMessage(from, 'List Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, text, { quoted: mek, contextInfo: { mentionedJid: online }})
             } catch (e) {
             reply(`${e}`)
}
             break    */             
            //------------------< Enable / Disable >-------------------
            case prefix + 'antibadword':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable') {
                    if (isBadword) return reply(`Udah aktif`)
                    grupbadword.push(from)
                    fs.writeFileSync('./database/grupbadword.json', JSON.stringify(grupbadword))
                    reply(`antibadword grup aktif, kirim ${prefix}listbadword untuk melihat list badword`)
                } else if (args[1].toLowerCase() === 'disable') {
                    anu = grupbadword.indexOf(from)
                    grupbadword.splice(anu, 1)
                    fs.writeFileSync('./database/grupbadword.json', JSON.stringify(grupbadword))
                    reply('antibadword grup nonaktif')
                } else {
                    reply(`Pilih enable atau disable`)
                }
                break
            case prefix + 'listbadword':
                let bi = `List badword\n\n`
                for (let boo of badword) {
                    bi += `- ${boo}\n`
                }
                bi += `\nTotal : ${badword.length}`
                reply(bi)
                break
            case prefix + 'addbadword':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`masukkan kata`)
                if (isKasar(args[1].toLowerCase(), badword)) return reply(`Udah ada`)
                addBadword(args[1].toLowerCase(), badword)
                reply(`Sukses`)
                break
            case prefix + 'delbadword':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`masukkan kata`)
                if (!isKasar(args[1].toLowerCase(), badword)) return reply(`Ga ada`)
                delBadword(args[1].toLowerCase(), badword)
                reply(`Sukses`)
                break
            case prefix + 'clearbadword':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`tag atau nomor`)
                if (mentioned.length !== 0) {
                    for (let i = 0; i < mentioned.length; i++) {
                        delCountKasar(mentioned[i], senbadword)
                    }
                    reply('Sukses')
                } else {
                    delCountKasar(args[1] + '@s.whatsapp.net', senbadword)
                    reply('Sukses')
                }
                break
            case prefix + 'mute':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (isMuted) return reply(`udah mute`)
                mute.push(from)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                reply(`Bot berhasil dimute di chat ini`)
                break
          case prefix + 'antilink':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable') {
                    if (isAntiLink) return reply(`Udah aktif`)
                    antilink.push(from)
                    fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
                    reply('Antilink grup aktif')
                } else if (args[1].toLowerCase() === 'disable') {
                    let anu = antilink.indexOf(from)
                    antilink.splice(anu, 1)
                    fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
                    reply('Antilink grup nonaktif')
                } else {
                    reply(`Pilih enable atau disable`)
                }
                break
          case prefix+'antiviewonce': case prefix+'antivo':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isAntiVO) return reply(`Udah aktif`)
                    antiviewonce.push(from)
					fs.writeFileSync('./database/antiviewonce.json', JSON.stringify(antiviewonce))
					reply('Antiview Once grup aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = antiviewonce.indexOf(from)
                    antiviewonce.splice(anu, 1)
                    fs.writeFileSync('./database/antiviewonce.json', JSON.stringify(antiviewonce))
                    reply('antiviewonce grup nonaktif')
                } else {
                    reply(from, `antiviewonce`)
                }
                break 
            case prefix+'antiwame':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable\nContoh : ${prefix}antiwame enable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isAntiWame) return reply(`Udah aktif`)
                    antiwame.push(from)
					fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame))
					reply('Anti wa.me grup aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = antiwame.indexOf(from)
                    antiwame.splice(anu, 1)
                    fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame))
                    reply('Anti wa.me grup nonaktif')
                } else {
                    reply(`Pilih enable atau disable\nContoh : ${prefix}antiwame enable`)
                }
                break                               
            case prefix + 'welcome':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable') {
                    if (isWelcome) return reply(`Udah aktif`)
                    welcome.push(from)
                    fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
                    reply('Welcome aktif')
                } else if (args[1].toLowerCase() === 'disable') {
                    let anu = welcome.indexOf(from)
                    welcome.splice(anu, 1)
                    fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
                    reply('Welcome nonaktif')
                } else {
                    reply(`Pilih enable atau disable`)
                }
                break
            case prefix + 'left':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable') {
                    if (isLeft) return reply(`Udah aktif`)
                    left.push(from)
                    fs.writeFileSync('./database/left.json', JSON.stringify(left))
                    reply('Left aktif')
                } else if (args[1].toLowerCase() === 'disable') {
                    let anu = left.indexOf(from)
                    left.splice(anu, 1)
                    fs.writeFileSync('./database/left.json', JSON.stringify(left))
                    reply('Left nonaktif')
                } else {
                    reply(`Pilih enable atau disable`)
                }
                break
              
                    
                   
             //------------------< menu nye bos >-------------------  
case prefix+'allmenu':
               let totalchat = await xinz.chats.all()
                let i = []
                let giid = []
                for (let mem of totalchat) {
                    i.push(mem.jid)
                }
                for (let id of i) {
                    if (id && id.includes('g.us')) {
                        giid.push(id)
                    }
                }
                let cekvip1 = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premino = `${cekvip1.days} 𝑯𝒂𝒓𝒊`
           
                let timestampi = speed();
                let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = xinz.user.phone
                let anu = process.uptime()
                            try {
                var pic = await xinz.getProfilePicture(`${sender.split('@')[0]}@c.us`)
            } catch {
                var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
            }
let img = await getBuffer(pic)                

let menuhe = `❐──➨ *「 𝑰𝒏𝒇𝒐 𝒖𝒔𝒆𝒓 」*
${emitet}Name : *${pushname}*
${emitet}Api : *@${sender.split("@")[0]}* 
${emitet}Status = *${isOwner ? '𝑶𝒘𝒏𝒆𝒓' : isPremium ? '𝑷𝒓𝒆𝒎𝒊𝒖𝒎' : '𝑮𝒓𝒂𝒕𝒊𝒔𝒂𝒏'}*
${emitet}Limit = *${isPremium ? '𝑼𝒏𝒍𝒊𝒎𝒊𝒕𝒆𝒅' : `${getLimit(sender, limitCount, limit)}`}*
${emitet}Limit game = *${cekGLimit(sender, gcount, glimit)}*
${emitet}Expired Prem : *${isOwner ? '𝑷𝒆𝒓𝒎𝒂𝒏𝒆𝒏𝒕' : isPremium ? premino : '𝑵𝒐𝒕 𝒑𝒓𝒆𝒎𝒊𝒖𝒎'}*

❐──➨ *「 𝑰𝒏𝒇𝒐 𝒃𝒐𝒕 」*
${emitet}Bot name : *${botName}*
${emitet}Creator : *@${owner}*
${emitet}Owner : *${ownerName}*
${emitet}Active : *${runtime(process.uptime())}*
${emitet}Speed :  *${latensii.toFixed(4)}* 𝑫𝒆𝒕𝒊𝒌
${emitet}Total chat : *${totalchat.length}*
${emitet}Group Chat : *${giid.length}*
${emitet}User Bot : *${pendaftar.length}*

❐──➨ *「 𝑪𝒂𝒍𝒆𝒏𝒅𝒆𝒓 」*
${emote} Jam : *${timeWib} 𝑾𝒊𝒃*
${emote} Jam : *${timeWita} 𝑾𝒊𝒕𝒂*
${emote} Jam : *${timeWit} 𝑾𝒊𝒕*
${emote} tanggal : *${tanggal}*
${emote} Tgl jawa : ${week} ${weton}

${menu(prefix, emote)}
 
*Bot WhatsApp simple*
Creator By dinata`
xinz.sendMessage(from, img, image, {quoted: fakeTroli, caption: menuhe, contextInfo:{externalAdReply: fakeLink, mentionedJid: [ownerNumber, sender]}})
break  
            default:
            if (isCmd) {
                textImg(`Maaf kak ${pushname} ${command} tidak ada didalam menu bot`)
            }                 
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}

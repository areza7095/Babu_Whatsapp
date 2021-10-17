"use strict";
let { WAConnection : _WAConnection } = require("@adiwajshing/baileys");
let { MessageType } = require("@adiwajshing/baileys");
const qrcode = require("qrcode-terminal");
const figlet = require("figlet");
const fs = require("fs");

const { color, bgcolor, biocolor, XinzLog } = require("./lib/color");
const { serialize } = require("./lib/myfunc");
const myfunc = require("./lib/myfunc");
const afk = require("./lib/afk");

let WAConnection = myfunc.WAConnection(_WAConnection)

let _afk = JSON.parse(fs.readFileSync('./database/afk.json'));
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let left = JSON.parse(fs.readFileSync('./database/left.json'));
let setting = JSON.parse(fs.readFileSync('./config.json'));
let blocked = [];

global.xinz = new WAConnection()
xinz.mode = 'public'
xinz.baterai = {
    baterai: 0,
    cas: false
};
xinz.multi = true
xinz.nopref = false
xinz.prefa = 'anjing'
xinz.spam = []

require('./message/din.js')
nocache('./message/din.js', module => console.log(color(`'${module}' Telah berubah!`)))
require('./message/help.js')
nocache('./message/help.js', module => console.log(color(`'${module}' Telah berubah!`)))

const start = async(sesion) => {
    xinz.logger.level = 'warn'
    xinz.browserDescription = ['MacOs', 'Desktop', '3.0']

    // MENG WE EM
    console.log(color(figlet.textSync('DINATA', {
		font: 'Bloody',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		whitespaceBreak: false
	}), 'cyan'))
    console.log(bgcolor(' WhatsApp BOT', 'red'))	
	console.log(biocolor(`==========< Bio >==========`))	
	console.log(biocolor(`=>  Bot creator by Dinata`))
	console.log(biocolor(`=>  Wa : 083193164235`))
	console.log(biocolor(`=>  Ig : Diiinataaa`))
	console.log(biocolor(`=>  Yt : Dinata Bot`))
	console.log(biocolor(`=>  Base by XinzTeam`))		
	console.log(biocolor(`===============>`))
	console.log(biocolor(` `))					
		

    // Menunggu QR
    xinz.on('qr', qr => {
        qrcode.generate(qr, { small: true })
        console.log(XinzLog('=========>'))      
        console.log(XinzLog('Scan Qr nya bang'))
        
    })

    // Restore Sesion
    fs.existsSync(sesion) && xinz.loadAuthInfo(sesion)

    // Mencoba menghubungkan
    xinz.on('connecting', () => {
		console.log(XinzLog('=>  Connecting...'))
	})

    // Konek
    xinz.on('open', (json) => {
		console.log(XinzLog('Tersambung gk subrek , dijamin emror'))
	})

    // Write Sesion
    await xinz.connect({timeoutMs: 30*1000})
    fs.writeFileSync(sesion, JSON.stringify(xinz.base64EncodedAuthInfo(), null, '\t'))

    // Ya gitulah
    xinz.on('ws-close', () => {
        console.log(XinzLog('Udahan ya kak kita putus jangan rindu'))
    })

    // Ntahlah
    xinz.on('close', async ({ reason, isReconnecting }) => {
        console.log(XinzLog('Terputus, Alasan :' + reason + '\nMencoba mengkoneksi ulang :' + isReconnecting))
        if (!isReconnecting) {
            console.log(XinzLog('Connect To Phone Rejected and Shutting Down.'))
        }
    })

    // Block
    xinz.on('CB:Blocklist', json => {
        if (blocked.length > 2) return
        for (let i of json[1].blocklist) {
            blocked.push(i.replace('c.us','s.whatsapp.net'))
        }
    })

    // Action Call
    xinz.on('CB:action,,call', async json => {
        const callerid = json[2][0][1].from;
        xinz.sendMessage(callerid, `Maaf bot tidak menerima call`, MessageType.text)
        await xinz.blockUser(callerid, "add")
    })

    // Action Battery
    xinz.on('CB:action,,battery', json => {
        const a = json[2][0][1].value
        const b = json[2][0][1].live
        xinz.baterai.baterai = a
        xinz.baterai.cas = b
    })

    // Chat
    xinz.on('chat-update', async (qul) => {
        // Presence
        if (qul.presences){
            for (let key in qul.presences){
                if (qul.presences[key].lastKnownPresence === "composing" || qul.presences[key].lastKnownPresence === "recording"){
                    if (afk.checkAfkUser(key, _afk)) {
                        _afk.splice(afk.getAfkPosition(key, _afk), 1)
                        fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                        xinz.sendMessage(qul.jid, `@${key.split("@")[0]} berhenti afk, dia sedang ${qul.presences[key].lastKnownPresence === "composing" ? "mengetik" : "merekam"}`, MessageType.extendedText, {contextInfo: {"mentionedJid": [key]}})
                    }
                }
            }
        }
		if (!qul.hasNewMessage) return
        qul = qul.messages.all()[0]

        if (!qul.message) return
		if (qul.key && qul.key.remoteJid == 'status@broadcast') return
        let msg = serialize(xinz, qul)

		require('./message/din')(xinz, msg, blocked, _afk, welcome, left)
	})
 
    // Event Group 
    xinz.on('group-participants-update', async (anj) => {
        require("./message/group")(xinz, anj, welcome, left)
    })
}
/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
 function nocache(module, cb = () => { }) {
    console.log(color(`Module ${module} Dinata selalu mengawasi`))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

start(`./DinataQr.json`)
.catch(err => console.log(err))
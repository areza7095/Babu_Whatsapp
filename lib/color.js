const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.yellow(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const biocolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const XinzLog = (text, color) => {
	return !color ? chalk.blue('[DIN-BOT] ') + chalk.yellow(text) : chalk.blue('[DIN-BOT] ') + chalk.keyword(color)(text)
}

module.exports = {
	color,
	bgcolor,
	biocolor,
	XinzLog
}

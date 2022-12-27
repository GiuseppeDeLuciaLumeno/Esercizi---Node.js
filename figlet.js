const art = require("figlet")

let textToanimate = "Benvenuti in Develhope"

const artAttack = art(textToanimate, (err, finalText) => {
    if (err) {
        console.log(`Errore tipo/codice: ${err}`)
    }
    console.log(`Testo:
${finalText}`)
})



module.exports = artAttack   //in case of export width Common js



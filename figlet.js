const art = require("figlet")

const configArt = (err, data) => {
    if (err) {
        console.log(`Errore: codice/tipo ${err}`)
    }

   console.log(data)
}

let textToanimate = "Benvenuti in Develhope"


const artAttack = art(textToanimate, configArt)





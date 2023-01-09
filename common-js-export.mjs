const getName = (name) => {
    if (typeof name !== "string") {
        return "Errore: Inserire un Nome!"
    }
    return `Il mio nome è: ${name}`
}

export default getName

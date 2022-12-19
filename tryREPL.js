const crypto = require("crypto")

const dataId = crypto.randomBytes(10)
const id = dataId.toString("hex")

console.log(`ID a 20 caratteri Randomici: ${id}`)






const {randomUUID} = require("crypto")

const fasterID = randomUUID()
console.log(`Faster ID: ${fasterID}`)
import * as write from "node:fs"

const fileName = "sayHello.txt"
const text = `Benvenuti in Develhope`


write.writeFile(fileName, text, (err) => {
    if (err) {
        console.error(err)
        return
    }
   console.log(text)
})


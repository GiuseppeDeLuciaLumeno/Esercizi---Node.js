//Calling Api - and Send Data:
import { app, port, link} from "./server.js"

app.listen(port, () => console.log(`Running: ${link}`))
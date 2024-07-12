import express from "express"
import { authRouter } from "./routes/auth.route.js"

const app = express()
app.use(express.json());

app.get('/', (req, res) => { res.send('Running') })

app.use('/auth', authRouter)

app.listen(1337, () => (console.log('Running')))  
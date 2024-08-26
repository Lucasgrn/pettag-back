import express from "express"
import cors from "cors"
import { authRouter } from "./routes/auth.route.js"
import { petRouter } from "./routes/pet.route.js";
import { locationRouter } from "./routes/location.route.js";
import { userRouter } from "./routes/user.route.js";
import { tagRouter } from "./routes/tag.route.js";

const app = express()
app.use(express.json());

let corsOptions = {
  origin: "https://pettag-front.vercel.app"
}
app.use(cors(corsOptions))
app.get('/', (req, res) => { res.send('Running') })

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/pet', petRouter)
app.use('/location', locationRouter)
app.use('/tag', tagRouter)

app.listen(1337, () => (console.log('Running')))  
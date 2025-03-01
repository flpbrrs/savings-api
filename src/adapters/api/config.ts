import express from 'express'
import cors from 'cors'

const PORT = process.env.API_PORT ?? 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}))

app.get('/ping', (_, res) => {
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`)
})

export default app;
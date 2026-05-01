import 'dotenv/config'
import express from 'express'
import {callAssistant} from "./chat.js";
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors());
app.use(express.static("public"));


app.get('/api/test', async (req, res) => {
    const response = await callAssistant("Where does Troy Parrott currently play?")
   console.log(response)
    res.json({ response })
})

app.post('/api/chat', async (req, res) => {
    try {

        const userInput = req.body.prompt;

        if (!userInput) {
            return res.status(400).json({error: "No message provided"});
        }

        const aiReply = await callAssistant(userInput);


        res.json(aiReply);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Assistant failed"});
    }
});

app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile("public/index.html", {root: "."});
});

app.listen(8000, () => console.log(`Server on http://localhost:8000`))
import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Videos from './dbModel.js';

// app config
const app = express();
const port = process.env.PORT || 9000;
const connection_url = 'mongodb+srv://admin:dk7c2JX8QuW9udLi@cluster0.nloeu.mongodb.net/myTiktokDatabase?retryWrites=true&w=majority'

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// api endpoints
app.get("/", (req, res) => res.status(200).send("Tiktok Mern Bk"))

// routes
app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body
    Videos.create(dbVideos, (err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})

app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(200).send(data)
    })
})

// listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`))
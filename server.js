import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;
let bestScores = null;

fs.readFile('./src/bestscores.json', (err, data) => {
        console.log('wola')
        bestScores = []
        console.log(bestScores)
        if (err) {
            console.log(err);
        } else {
            bestScores = JSON.parse(data);
            console.log(bestScores)
        }

})


app.post('/writefile', (req, res) => {

    console.log(req.body)
    const bestscore = req.body.bestscores

    fs.writeFile('./src/bestscores.json', JSON.stringify(bestscore), () => {
        console.log('data written')
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});
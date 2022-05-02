const express = require('express');
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');


// middlewire
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.me4jw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const pcCollection = client.db("pcCollection").collection("pc");

        app.get('/product', async(req, res) => {
            const query = {};
            const cursor = pcCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running inventory server')
})
app.listen(port, () => {
    console.log('listening to port', port);
})
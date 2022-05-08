const express = require('express');
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middlewire
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.me4jw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const pcCollection = client.db("pcCollection").collection("pc");
        const reviewCollection = client.db("pcCollection").collection("reviews");

        // send all products
        app.get('/product', async(req, res) => {
            const query = {};
            const cursor = pcCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        // send single product
        app.get('/product/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const product = await pcCollection.findOne(query);
            res.send(product);
        })

        // add a product
        app.post('/product', async(req, res)=>{
            const newService = req.body;
            const result = await pcCollection.insertOne(newService);
            res.send(result)
        })

        // delete a product
        app.delete('/product/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await pcCollection.deleteOne(query);
            res.send(result);
        })

        // send all reviews
        app.get('/review', async(req, res)=>{
            const query = {};
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
 
        })
        //send single review
        app.get('/review/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const review = await reviewCollection.findOne(query);
            res.send(review);
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
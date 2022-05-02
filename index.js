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

async function run(){
    try{
        await client.connect();
        const pcCollection = client.db("pcCollection").collection("pc");

        const docs = [
            {
                "name":"HP 15s-du1117TU Pentium Silver N5030 15.6 inch HD Laptop",
                "image":"https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/15s-du1117tu/15s-du1117tu-001-228x228.jpg",
                "description":"Intel Pentium Silver N5030 Processor, 4GB RAM, 1TB HDD, 15.6 inch display",
                "price":"37,800৳",
                "quantity":20,
                "supplier":"HP"
            },
            {
                "name":"Asus VivoBook 14 X415FA Core i3 10th Gen 14 inch FHD Laptop",
                "image":"https://www.startech.com.bd/image/cache/catalog/laptop/asus/vivobook-14/vivobook-14-4-228x228.jpg",
                "description":"Intel Core i3 10110U Processor 4GB RAM, 1TB HDD, 14 inch display",
                "price":"50,000৳",
                "quantity":30,
                "supplier":"Asus"
            },
            {
                "name":"Dell Vostro 14 3400 11th Gen Core i3 14 inch HD Laptop",
                "image":"https://www.startech.com.bd/image/cache/catalog/laptop/dell/14-3400/vostro-14-3400-black-front-228x228.jpg",
                "description":"Intel Core i3 10110U Processor 4GB RAM, 1TB HDD, 14 inch display",
                "price":"35,800৳",
                "quantity":10,
                "supplier":"Dell"
            },
            {
                "name":"Acer Aspire 3 A315-58 Core i5 11th Gen 15.6 inch FHD Laptop",
                "image":"https://www.startech.com.bd/image/cache/catalog/laptop/acer/aspire-3-a315-58/aspire-3-a315-58-001-228x228.jpg",
                "description":"Intel Core i5-1135G7 Processor, 8GB RAM, 1TB SSD, 15.6 inch LTD Display",
                "price":"90,000৳",
                "quantity":40,
                "supplier":"Acer"
            },
            {
                "name":"MSI Modern 14 B10MW Core i3 10th Gen 14 inch Full HD Laptop",
                "image":"https://www.startech.com.bd/image/cache/catalog/laptop/msi/modern-14-b10mw/modern-14-b10mw-228x228.jpg",
                "description":"Intel Core i3 10110U Processor, 4GB RAM, 256GB SSD, 14 inch FHD Display",
                "price":"48,000৳",
                "quantity":30,
                "supplier":"MSI"
            },
            {
                "name":"Huawei MateBook D15 Core i5 11th Gen 15.6 FHD Laptop",
                "image":"https://www.startech.com.bd/image/cache/catalog/laptop/huawei/matebook-d-15/matebook-d-15-01-228x228.jpg",
                "description":"intel Core i5-1135G7 processor, 8GB RAM, 512GB SSD, 15.6 FHD Display",
                "price":"70,000৳",
                "quantity":40,
                "supplier":"Huawei"
            },
            {
                "name":"HP Probook 450 G8 Core i5 11th Gen 512GB SSD 15.6 inch FHD Laptop",
                "image":"https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/probook-450-g8/probook-450-g8-001-228x228.jpg",
                "description":"Intel Core i5-1135G7 Processor, 8GB RAM, 512GB SSD, 15.6 inch FHD Display",
                "price":"77000৳",
                "quantity":30,
                "supplier":"HP"
            }
        ]
        const result = await pcCollection.insertMany(docs);
        console.log(`${result.insertedCount} documents were inserted`);
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/',(req, res)=>{
    res.send('running inventory server')
})
app.listen(port, ()=>{
    console.log('listening to port', port);
})
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// MiddleWare
app.use(cors());
app.use(express.json());

// MongoDB Code

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7grn8zj.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    
    const productsCollection = client.db('productDB').collection('products');

    
    // Sending to server
    // Getting Data
    app.post('/products',async(req,res)=>{
        const newProduct = req.body;
        console.log(newProduct);
       const result = await productsCollection.insertOne(newProduct);
       res.send(result)
    })

    // Reading Data
    app.get('/products',async(req,res)=>{
        const cursor = productsCollection.find();
        const result= await cursor.toArray();
        res.send(result)
    })

    // sending to server ends here

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);

// mongodb code ends here

app.get("/", (req, res) => {
  res.send("Programming-Hero Technology Is Running");
});

app.listen(port, () => {
  console.log(`Programming-Hero Server Is Running On Port : ${port}`);
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    const productsCollection = client.db("productDB").collection("products");
    const userCollection = client.db("productDB").collection("user");

    // Sending to server
    // Getting Data
    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    });

    // Reading Data
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // Updating Data
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    // Deleting Data
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    // Updating again in the user
    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateProduct = req.body;
      const product = {
        $set: {
          name: updateProduct.name,
          image: updateProduct.image,
          image_url: updateProduct.image_url,
          Brand_name: updateProduct.Brand_name,
          category: updateProduct.category,
          price: updateProduct.price,
          description: updateProduct.description,
          rating: updateProduct.rating,
        },
      };
      const result = await productsCollection.updateOne(
        filter,
        product,
        options
      );
      res.send(result);
    });

    // USer Realated API
    app.post("/user", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // reating data
    app.get("/user",async(req,res)=>{
        const cursor = userCollection.find();
        const users = await cursor.toArray();
        res.send(users);
    })

    // Deleting
    app.delete("/user/:id",async(req,res)=>{
        const id = req.params.id;
        const query= {_id: new ObjectId(id)};
        const result = await userCollection.deleteOne(query);
        res.send(result);
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

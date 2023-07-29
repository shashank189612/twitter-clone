require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
// ${process.env.DB_USER}   ${process.env.DB_PASSWORD}

// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;

// Use the variables in your MongoDB URI
// const uri = `mongodb+srv://${dbUser}:${dbPassword}@twitterclone.h0smflz.mongodb.net/?retryWrites=true&w=majority`;

const uri = `mongodb+srv://shashanknm18:tA3GixJ8JTDH1sUI@twitterclone.h0smflz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUNifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let postCollection;
let userCollection;

async function run() {
  try {
    await client.connect();

    postCollection = client.db("database").collection("posts");
    userCollection = client.db("database").collection("users");

    app.get("/post", async (req, res) => {
      const post = await (await postCollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await userCollection.find().toArray();
      1;
      res.send(user);
    });

    app.get("/loggedInUser", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.find({ email: email }).toArray();
      res.send(user);
    });

    app.get("/userPost", async (req, res) => {
      const email = req.query.email;
      const post = (
        await postCollection.find({ email: email }).toArray()
      ).reverse();
      res.send(post);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });
    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch("/userUpdates/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(` listening on port ${port}`);
});

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

//app use
app.use(cors());
app.use(bodyParser.json());

//Database Connection
const uri = process.env.DB_CONNECT;
let client = new MongoClient(uri, { useNewUrlParser: true });

const users = ['Sumon', 'Korim', 'Alim'];

//Get all Products
app.get('/products', (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db('onlinestore').collection('products');
    collection
      .find()
      .limit(10)
      .toArray((err, documents) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: err });
        } else {
          res.send(documents);
        }
      });
    client.close();
  });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const name = users[id];
  res.send({ id, name });
});

//post request
app.post('/addProduct', (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  const product = req.body;
  client.connect((err) => {
    const collection = client.db('Dream-Shop').collection('products');
    collection.insertOne(product, (err, result) => {
      console.log('successfully inserted', result);
      if (err) {
        console.log(err);
        res.status(500).send({ msg: err.message });
      } else {
        res.send(result.ops[0]);
      }
    });

    client.close();
  });
});

const port = process.env.PORT || 4500;
app.listen(port, () =>
  console.log(` app listening at http://localhost:${port}`)
);

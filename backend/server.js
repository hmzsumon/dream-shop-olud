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
    const collection = client.db('Dream-Shop').collection('products');
    collection.find().toArray((err, documents) => {
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

//get uniq product
app.get('/product/:key', (req, res) => {
  const key = req.params.key;
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db('Dream-Shop').collection('products');
    collection.find({ key }).toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents[0]);
      }
    });
    client.close();
  });
});

//get product by keys api
app.post('/getProductsByKey', (req, res) => {
  const key = req.params.key;
  const productKey = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    const collection = client.db('Dream-Shop').collection('products');
    collection.find({ key: { $in: productKey } }).toArray((err, documents) => {
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

//post request
app.post('/addProduct', (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  const product = req.body;
  client.connect((err) => {
    const collection = client.db('Dream-Shop').collection('products');
    collection.insert(product, (err, result) => {
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

//Order request(place order api)
app.post('/placeOrder', (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });
  const orderDetails = req.body;
  orderDetails.time = new Date();
  client.connect((err) => {
    const collection = client.db('Dream-Shop').collection('orders');
    collection.insert(orderDetails, (err, result) => {
      console.log('successfully order placed', result);
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

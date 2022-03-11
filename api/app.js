const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');


//load in mongoose models from index
const { List, Product } = require('./db/models');

//load middleware
app.use(bodyParser.json());


//CORS Header Middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* Router handlers */

/*List routes */

/**
 * GET / lists
 * Purpose: Get all lists
 * we want to return an array of alle the lists in  the db
 */
 app.get('/lists', (req, res) => {
  // We want to return an array of all the lists that belong to the authenticated user
  List.find({}).then((lists) => {
      res.send(lists);
  })
})


/**
 * POST / lists
 * Purpose: create list
 * create new list and return new list document back to the user
 */

 app.post('/lists', (req, res) => {
  // We want to create a new list and return the new list document back to the user (which includes the id)
  // The list information (fields) will be passed in via the JSON request body
  let title = req.body.title;

  let newList = new List({
      title
  });
  newList.save().then((listDoc) => {
      // the full list document is returned (incl. id)
      res.send(listDoc);
  })
});

/**
 * PATH /lists/:id
 * UPDATE a list
 */


app.patch('/lists/:id', (req, res) =>{
  List.findOneAndUpdate({ _id: req.params.id }, {
      $set: req.body
  }).then(() => {
    res.sendStatus(200);
  });
});


/**
 * delete
 */



 app.delete('/lists/:id', (req, res) => {
  // We want to delete the specified list (document with id in the URL)
  List.findOneAndRemove({
      _id: req.params.id,

  }).then((removedListDoc) => {
      res.send(removedListDoc);
  })
});

/**
 * show all products of one list
 *
 */


 app.get('/lists/:listId/products', (req, res) => {
   //we want to return all the products that belong to that list
   Product.find({
     _listId: req.params.listId
   }).then((products) => {
     res.send(products);
   })
 });

 //show only document of certain product in certain list

app.get('/lists/:listId/products/:productId', (req, res) =>{
  Product.findOne({
    _id: req.params.productId,
    _listId: req.params.listId
  }).then((product) => {
    res.send(product);
  })
})


/**
 * create new Product in list
 */


app.post('/lists/:listId/products', (req, res) => {
  let newProduct = new Product({
    title: req.body.title,
    _listId: req.params.listId
  });
  newProduct.save().then((newProductDoc) => {
    res.send(newProductDoc);
  })
});

/**
 * update product
 */

app.patch('/lists/:listId/products/:productId', (req, res) =>{
  Product.findOneAndUpdate( { _id: req.params.productId, _listId: req.params.listId},
    { $set: req.body }).then(() => {
      res.sendStatus(200)
  })
})


/**
 * delete product
 */

app.delete('/lists/:listId/products/:productId', (req, res) =>{
  Product.findOneAndRemove( { _id: req.params.productId, _listId: req.params.listId},).then((removedProductDoc) => {
    res.send(removedProductDoc)
  })
})




app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

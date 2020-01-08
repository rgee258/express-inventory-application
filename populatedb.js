#! /usr/bin/env node

console.log('This script populates some test items and categories to the database. Specified database as argument - e.g.: populatedb "<database URL here>"');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item')
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var categories = []

function itemCreate(name, description, category, price, stock, cb) {
  itemDetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    stock: stock
  }
  
  var item = new Item(itemDetail);
       
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}

function categoryCreate(name, description, cb) {
  categoryDetail = {
    name: name,
    description: description
  }
  
  var category = new Category(categoryDetail);
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}


function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate('Fresh Water Fish', 'Fish that live in water with less than 0.05% salt content.', callback);
        },
        function(callback) {
          categoryCreate('Salt Water Fish', 'Fish that live in water with 3 - 5% salt content.', callback);
        }
        ],
        // optional callback
        cb);
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate('Goldfish', 'A common orange fish that everyone should know!', categories[0], 9.99, 49, callback);
        },
        function(callback) {
          itemCreate('Guppy', "A tiny fish that's colorful and easy to raise.", categories[0], 3.99, 100, callback);
        },
        function(callback) {
          itemCreate('Betta Fish', 'Beautiful but known for their aggressive nature and other name, the Siamese fighting fish.', categories[0], 9.99, 12, callback);
        },
        function(callback) {
          itemCreate('Plecostomus', 'Well known for being algae eaters, be mindful of how big these fish can actually grow!', categories[0], 15.99, 16, callback);
        },
        function(callback) {
          itemCreate('Orange Clownfish', 'Ever try finding one named Nemo?', categories[1], 24.99, 12, callback);
        },
        function(callback) {
          itemCreate('Yellow Tang', "One of the most popular salt water fish with a bright coloration.", categories[1], 27.99, 8, callback);
        },
        function(callback) {
          itemCreate('Blue Tang', 'P Sherman, 42 Wallaby Way, Sydney', categories[1], 247.99, 9, callback);
        }
        ],
        // optional callback
        cb);
}

async.series([
    createCategories,
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
      console.log('FINAL ERR: '+err);
      return;
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

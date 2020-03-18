/* eslint-disable semi */
var express = require('express');
var axios = require('axios');
var Sequelize = require('sequelize');
var apiKey = 'AIzaSyCeM1m73twcAewk29CbTe4IJIIc4U1hQkQ';

var router = express.Router();

var volumeId;

// Import the model (booksreview.js and Book.js) to use its database functions.
var db = require('../models');

// Create all our routes and set up logic within those routes where required.

// Route for homepage
router.get('/', function (req, res) {
  // db.Book.findAll({ order: [Sequelize.fn('max', Sequelize.col('rating'))], limit: 6 }).then(function (Books) {
  // db.Book.findAll({ limit: 6 }).then(function (Books) {
  //   // var queries = [];
  //   const urlArray = [];
  //   // console.log(Books);
  //   for (var i = 0; i < Books.length; i++) {
  //     // queries.push(axios.get(`https://www.googleapis.com/books/v1/volumes/${Books[i].dataValues.volume_id}`));
  //     urlArray.push(`https://www.googleapis.com/books/v1/volumes/${Books[i].dataValues.volume_id}`);
  //   };
  //   const promiseArray = urlArray.map(url => axios.get(url));
  //   console.log(promiseArray.toString());
  //   axios.all([
  //     promiseArray
  //   ])
  //     .then(apiresult => {
  //       var book = [];
  //       // if (Object.entries(res1).length !== 0) { console.log(res1); book.push(res1.data) };
  //       // if (Object.entries(res2).length !== 0) { console.log(res2); book.push(res2.data) };
  //       // if (Object.entries(res3).length !== 0) { console.log(res3); book.push(res3.data) };
  //       // if (Object.entries(res4).length !== 0) { console.log(res4); book.push(res4.data) };
  //       // if (Object.entries(res5).length !== 0) { console.log(res5); book.push(res5.data) };
  //       // if (Object.entries(res6).length !== 0) { console.log(res6); book.push(res6.data) };
  //       console.log(apiresult);
  //       res.render('index', { book: apiresult })
  //     });
  // });
  res.render('index');
});

// Route for homepage with Search result
router.get('/api/search/:searchText', function (req, res) {
  var searchText = req.params.searchText;
  var queryUrl = `https://content.googleapis.com/books/v1/volumes?maxResults=6&q=${searchText}&key=${apiKey}`;
  axios.get(queryUrl).then(apiResponse => {
    // console.log(apiResponse.data.items[0].volumeInfo);
    res.render('index', { book: apiResponse.data.items });
  }
  );
});

// Get comments for a given volume
router.get('/api/comments/:volumeId', function (req, res) {
  volumeId = req.params.volumeId;
  db.Reviews.findAll({ where: { bookid: volumeId } }).then(function (reviewData) {
    res.json(reviewData);
  });
});

// Get details page including comments
router.get('/details/:volumeId', function (req, res) {
  volumeId = req.params.volumeId;
  console.log(volumeId);
  
  var queryUrl = `https://www.googleapis.com/books/v1/volumes/${volumeId}`;
  axios.get(queryUrl).then(apiResponse => {
    db.Reviews.findAll({ where: { bookid: volumeId } }).then(function (reviewData) {
      var hbsObject = {
        id: apiResponse.data.id,
        leInfo: apiResponse.data.volumeInfo,
        reviews: reviewData
      };

      res.render('2ndPageBookTemplate', hbsObject);
    });
  }
  );
});

// Post comments
router.post('/api/comments/:volumeId', function (req, res) {
  volumeId = req.params.volumeId;
  // Update the new review comment in DB
  db.Reviews.create({ book_id: volumeId, comments: req.body.comment, pName: req.body.name, rating: req.body.rating })
    .then(console.log("Created!!"));
});

// Post book
router.post('/api/book/:volumeId', function (req, res) {
  volumeId = req.params.volumeId;
  // Update the new review comment in DB
  db.Book.create({ title: req.body.title, author: req.body.author, volume_id: volumeId, isbn: req.body.isbn })
    .then(console.log("Created!!"));
});

// Export routes for server.js to use.
module.exports = router;

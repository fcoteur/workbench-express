const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

var Bookmark = require('../models/bookmark');

// Display list of all Bookmarks
exports.bookmark_list = function(req, res) {
  Bookmark.find({})
  .exec(function (err, list) {
    if (err) { return next(err); }
    res.send(list);
  });
};

// Create new Bookmark
exports.bookmark_create = [
  body('title', 'Title required').isLength({ min: 1 }).trim(),
  body('url', 'Url required').isLength({ min: 1 }).trim(),
  sanitizeBody('title').trim().escape(),
  function(req, res, next) {
    const errors = validationResult(req);
    
    var bookmark = new Bookmark({ 
      title: req.body.title,
      url: req.body.url
    });
       
    if (!errors.isEmpty()) {
      console.log(errors.array());
    return;
    }
    else {
      bookmark.save(function (err) {
        if (err) { return next(err); }
        console.log('bookmark: ' + bookmark.title + ' saved')
        res.send({id: bookmark._id, msg: 'created'})
      });
    }
  }
];

// Delete Bookmark
exports.bookmark_delete = function(req, res) {
  Bookmark.deleteOne({ _id: req.body.id})
  .exec(function (err, bookmark) {
    if (err) { return next(err); }
    res.send({id: req.body.id, msg: 'deleted'})
  });
};

// Edit Bookmark
exports.bookmark_update = [
  body('title', 'Title required').isLength({ min: 1 }).trim(),
  body('url', 'Url required').isLength({ min: 1 }).trim(),
  sanitizeBody('title').trim().escape(),
  sanitizeBody('url').trim().escape(),
  function(req, res, next) {
    const errors = validationResult(req);
            
    if (!errors.isEmpty()) {
      console.log(errors.array());
    return;
    }
    else {
      Bookmark.updateOne({ _id: req.body.id}, {title: req.body.title, url:req.body.url})
        .exec(function (err, list) {
          if (err) { return next(err); }
          res.send({id: req.body.id, msg: 'updated'});
        });
    }
  }
];
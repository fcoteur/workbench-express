var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookmarkSchema = new Schema(
  {
    title: {type: String, required: true},
    url: {type: String, required: true},
  }
);

module.exports = mongoose.model('Bookmark', BookmarkSchema);
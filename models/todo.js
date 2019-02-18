var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    done: {type: Boolean, required: true, default: false},
  }
);

module.exports = mongoose.model('Todo', TodoSchema);
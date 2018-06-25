const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

//Posts Schema
const PostsSchema = new Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
    image: String,
    icon: String,
    textField: String,
    tags: String,
});

module.exports = Posts = mongoose.model('Posts', PostsSchema);
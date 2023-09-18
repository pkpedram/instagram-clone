const mongoose = require("mongoose");


const model = {
  relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  relatedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: new Date()},
};
            
const testSchema = new mongoose.Schema(model)
const Post = mongoose.model('Post', testSchema)
module.exports = Post
                      
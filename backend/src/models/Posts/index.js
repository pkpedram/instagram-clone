const mongoose = require("mongoose");

// POST TYPES CAN BE 
// video || image
          
const model = {
  caption: String,
  type: String,
  relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: new Date()},
  likes: Number,
};
            
const testSchema = new mongoose.Schema(model)
const Post = mongoose.model('Post', testSchema)
module.exports = Post
                      
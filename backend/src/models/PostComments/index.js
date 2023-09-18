const mongoose = require("mongoose");
          
const model = {
  relatedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  text: String,
  createdAt: {type: Date, default: new Date()},
};
            
const schema = new mongoose.Schema(model)
const PostComment = mongoose.model('PostComment', schema)
module.exports = PostComment
                      
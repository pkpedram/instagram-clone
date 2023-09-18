const mongoose = require("mongoose");


const model = {
  relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  relatedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  createdAt: {type: Date, default: new Date()},
};
            
const testSchema = new mongoose.Schema(model)
const PostLike = mongoose.model('PostLike', testSchema)
module.exports = PostLike
                      
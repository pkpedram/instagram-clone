const mongoose = require("mongoose");
          
const model = {
  relatedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  image: String,
};
            
const schema = new mongoose.Schema(model)
const PostImage = mongoose.model('PostImage', schema)
module.exports = PostImage
                      
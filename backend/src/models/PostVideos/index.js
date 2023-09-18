const mongoose = require("mongoose");
          
const model = {
  relatedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  video: String,
};
            
const schema = new mongoose.Schema(model)
const PostVideo = mongoose.model('PostVideo', schema)
module.exports = PostVideo
                      
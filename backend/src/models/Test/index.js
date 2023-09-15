const mongoose = require("mongoose");
          
const model = {
  title: String,
  link: {type: String, },
  stepNumber: {type: Number,  default: 0},
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const testSchema = new mongoose.Schema(model)
const Test = mongoose.model('Test', testSchema)
module.exports = Test
                      
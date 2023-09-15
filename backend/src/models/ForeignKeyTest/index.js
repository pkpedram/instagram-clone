const mongoose = require("mongoose");
          
const model = {
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test'},
  testByType: { type: mongoose.Schema.Types.ObjectId, ref: 'Test'},
  isActive: {type: Boolean,  default: true},
  created_date: {type: Date,  default: new Date()}
};
            
const foreignkeytestSchema = new mongoose.Schema(model)
const ForeignKeyTest = mongoose.model('ForeignKeyTest', foreignkeytestSchema)
module.exports = ForeignKeyTest
                      
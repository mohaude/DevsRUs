const mongoose = require('mongoose');

const ${model}Schema = new mongoose.Schema({
  // Schema will be defined based on requirements
}, { timestamps: true });

module.exports = mongoose.model('${model}', ${model}Schema);

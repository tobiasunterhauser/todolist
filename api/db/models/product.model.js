const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  _listId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product }

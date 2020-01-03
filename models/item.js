let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ItemSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 1 },
    description: { type: String, required: true, minlength: 1 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Schema.Types.Decimal128, required: true},
    stock: { type: Number, required: true, min: 0},
  }
);

ItemSchema
.virtual('url')
.get(function() {
  return '/items/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);

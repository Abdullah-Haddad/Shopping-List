let mongoose = require('mongoose');

// create a model class
let bookModel = mongoose.Schema({
    Name:String,
    Description:String,
    Price: Number
},
{
    collection:"Bio_books"
});
module.exports = mongoose.model('Product',bookModel);

var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });
    module.exports = mongoose;
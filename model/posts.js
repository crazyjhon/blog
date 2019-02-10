var mongoose = require('./db');
var Schema = mongoose.Schema;
    postSchema = new Schema({
        username:{
            type:String,
            required:true,
        },
        avatar:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        created_time:{
            type:Date,
            default:Date.now
        },
        last_modified_time:{
            type:Date,
            default:Date.now
        }
    });
var Posts = mongoose.model('Post',postSchema);

module.exports = Posts;
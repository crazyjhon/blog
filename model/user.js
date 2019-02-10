var mongoose = require('./db');
var Schema = mongoose.Schema;
    userSchema = new Schema({
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        gender:{//默认-1代表保密
            type:Number,
            enum:[-1,0,1],
            default:-1
        },
        avatar:{
            type:String,
            default:'/public/img/avatar-default.png'
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
var User = mongoose.model('User',userSchema);

 module.exports = User;
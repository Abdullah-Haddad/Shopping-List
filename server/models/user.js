let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    username:
        {
            type:String,
            default:"",
            trim:true,
            required:"Username is Required"
        },
    
    password:
        {
            type:String,
            default:"",
            trim:true,
            required:"Password is Required"
        },

    email:
        {
                type:String,
                default:"",
                trim:true,
                required:'Email is required'
        },
    
    displayname:
        {
            type:String,
            default:"",
            trim:true,
            required:"DisplayName is Required"
        },
    
    created:{
        type:Date,
        default: Date.now
    },
    
    update:{
        type:Date,
        default: Date.now
    },
},
    {
        collection: "user"
    }
);

// configure this model
let options = ({MissingPasswordError:'Wrong/Missing Password'});
User.plugin(passportLocalMongoose,options);
module.exports.User = mongoose.model('User',User);
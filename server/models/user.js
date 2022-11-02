//COMP229-Assignment-2-Vivian-Dang-302278335
//Require modules for the User Model
//Cannot authenticate w/o User Model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let User = mongoose.Schema(
    {
        username: {
            type: String,
            default: "",
            trim: true,
            required: "Username is required",
        },
        
        // password: {
        //     type: String,
        //     default: "",
        //     trim: true,
        //     required: "Password is required",
        // },                                                   //password will be auto generated in our lesson

        email: {
            type: String,
            default: "",
            trim: true,
            required: "Email is required",
        },

        displayName: {
            type: String,
            default: "",
            trim: true,
            required: "Display Name is required",
        },
        
        created: {
            type: Date,
            default: Date.now,
        },

        update: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "users",
    }
);

//Configure optiosn for User Model

let options = ({ missingPasswordError: "Wrong/Missing Password" });

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);     //(user model, user object)
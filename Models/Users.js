const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema 
//Edit for only one main. Look up how to do this
//Allow commentors?
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.export = User = mongoose.model('users', UserSchema);
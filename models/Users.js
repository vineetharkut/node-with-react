const mongoose = require('mongoose');
const {Schema} = mongoose ;

const userSchema = new Schema({
	googleId : String,
	name : String,
	emailId : String
});

mongoose.model('users',userSchema);
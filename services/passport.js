const passport 		= require('passport');
const GoogleStrategy= require('passport-google-oauth2');
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user,done) => {
	done(null,user.id);
});

passport.deserializeUser((id,done) => {
	User.findById(id)
		.then(user => {
			done(null,user);
		})
});

passport.use(new GoogleStrategy({
		clientID : keys.googleClientID,
		clientSecret : keys.googleClientSecret,
		callbackURL : '/auth/google/callback',
		proxy: true
	},
	/*(accessToken,refreshToken,profile,done) => {
		//console.log('Access Control '+accessToken);
		//console.log('Refresh Control '+refreshToken);
		//console.log('Profile '+profile);
		User.findOne({googleId:profile.id})
			.then((existingUser) => {
				//console.log(existingUser);
				if(existingUser){ // If User already exists
					done(null,existingUser);
				}else{ // If it is new users then create it
					new User({
						googleId:profile.id,
						name:profile.displayName,
						emailId:profile.emails[0]['value']
					}).save()
					  .then(user => {
					  	done(null,user);
					  });		

				}
			});*/
	async (accessToken,refreshToken,profile,done) => {
		const existingUser = await User.findOne({googleId:profile.id})
		//console.log(existingUser);
		if(existingUser){ // If User already exists
			done(null,existingUser);
		}else{ // If it is new users then create it
			const user = await new User({
											googleId:profile.id,
											name:profile.displayName,
											emailId:profile.emails[0]['value']
										}).save()
			done(null,user);		
		}
	}
));
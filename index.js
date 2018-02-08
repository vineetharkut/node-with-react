const express  = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/Users');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

const app = new express();

app.use(cookieSession({
	maxAge : 30 * 24 * 60 * 60 * 1000,
	keys:[keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI)
const PORT = process.env.PORT || 5000 ;

authRoutes(app);
//require('./routes/authRoutes')(app);


app.listen(PORT,()=>{
	console.log('Server is listening on port '+PORT)
});


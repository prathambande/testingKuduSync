const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const { get404 } = require('./controllers/error');
const app = express();
const mongoose = require('mongoose');
const csrf = require('csurf');
const flash = require('connect-flash');

const MONGODB_URI = 'mongodb+srv://pratham:PrathamNodeShop@cluster0.x0flmfl.mongodb.net/shop?retryWrites=true&w=majority';

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri : MONGODB_URI,
    collection: 'sessions'
})

const csrfProtection = csrf();

const User = require('./model/user');

const { mongoConnect } = require('./util/database');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secrett ?? ', resave :false, saveUninitialized: false, store: store}));

app.use(csrfProtection);
app.use(flash());

app.use((req,res,next) => {
    console.log('lets see session');
    console.log(req.session);
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id).then(user => {
        req.user = user;
        next();
    }).catch(err => {console.log(err);})
})

app.use((req,res,next) => {
    console.log(req.session.isLoggedIn);
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(get404);

// mongoConnect(() => {
//     app.listen(3000);
// })

mongoose.connect(MONGODB_URI)
.then(result => {
    console.log('Connected');
    app.listen(8080);
}).catch(err => {
    console.log(err);
})
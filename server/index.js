require ('dotenv').config();
const express = require("express");
const app=express();
const port = process.env.PORT || 3001;
const massive = require("massive");
const {json} = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const socketio = require('socket.io');
const path = require('path');

const breweryCntrl = require(`${__dirname}/controllers/breweryCntrl`);
const {strat, logout} = require(`${__dirname}/controllers/strategy`);
const favoritesCntrl = require(`${__dirname}/controllers/favoritesCntrl`);
const reviewsCntrl = require(`${__dirname}/controllers/reviewsCntrl`);

app.use(json());
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 100000
        }
    })
)

app.use( express.static( `${__dirname}/../build` ) );

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
}).catch(err => console.log(err));

app.use(passport.initialize());
app.use(passport.session());

passport.use(strat);

passport.serializeUser((user, done) => {
    const db = app.get("db");
    db.getUserByAuthId([user.id]).then(response => {
        if(!response[0]){
            db.addUserByAuthid([
                user.displayName,
                user.picture,
                user.emails[0].value,
                user.id
            ]).then(res => done(null, res[0]))
            .catch(console.log);
        } else return done(null, response[0]);
    })
    .catch(console.log);
});

passport.deserializeUser((user, done) => done(null, user));

app.get(
    "/login",
    passport.authenticate("auth0", {
        successRedirect: process.env.REACT_APP_HOME,
        failureRedirect: "/login"
    })
)

authenticated = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        res.sendStatus(403);
    }
};

app.get("/api/me", authenticated, (req, res, next) => {
    res.status(200).send(req.user);
});

app.get("/logout", logout);

app.get('/api/breweries', breweryCntrl.getBreweries);
app.get('/api/brewery/:id', breweryCntrl.getBrewery);
app.get('/api/beers', breweryCntrl.getBeers);
app.get('/api/beer/:id', breweryCntrl.getOneBeer);
app.get('/api/bandb/:id', breweryCntrl.beerAndBrewery);

app.get('/api/favorites/:id', favoritesCntrl.getFavorites);
app.post('/api/favorites', favoritesCntrl.addFavorite);
app.delete('/api/favorites/:id', favoritesCntrl.deleteFavorite);
app.delete('/api/favorites2/:id', favoritesCntrl.deleteFavorite2);

app.get('/api/reviews/:id', reviewsCntrl.getReviews);
app.post('/api/review', reviewsCntrl.addReview);
app.delete('/api/review/:id', reviewsCntrl.deleteReview);
app.put('/api/review/:id', reviewsCntrl.editReview);
app.get('/api/rating/:id', reviewsCntrl.getStarRating);

const expressServer = app.listen(port, () => {
    console.log('server is listening on port:', port)
  })
  
const io = socketio(expressServer)

let users = [];

io.on('connection', function(socket){
    var newUser;
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    });
    socket.on('SEND_USER', function(user){
        newUser = user;
        if(!users.includes(user)){users.push(user)};
        io.emit('RECEIVE_USERS', users);
        socket.emit('RECEIVE_MESSAGE', {
            author: "Server",
            message: "Welcome to beer chat!"
        })
        socket.broadcast.emit('RECEIVE_MESSAGE', {
            author: "Server",
            message: `${user} has joined the room!`
        })
    });
    socket.on('disconnect', function(){
        console.log('disconnected');
        let user = users.splice(users.indexOf(newUser),1);
        io.emit('RECEIVE_USERS', users);
        socket.broadcast.emit('RECEIVE_MESSAGE', {
            author: "Server",
            message: `${user} has left the room.`
        })
    });
})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var session = require("express-session");
app.use(session({'secret': 'secret'}));
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/movie_booking", {useNewUrlParser: true});
// get reference to database
var db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



/* GET home page. */
router.get('/', async function(req, res, next) {
  let data={
    title:'joby'
  };
  if(req.session.user_id){
      var UserSchema = require('../schemas/UserSchema');
      let doc=await UserSchema.userModel.findOne({ _id: req.session.user_id});
      console.log(doc)
      if(doc.length==0){
         
      }else{
        data.name=doc.username;
      }
  }

  res.render('index', data);
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'JOby' });
});
router.post('/register', function(req, res, next) {

    let username=req.body.username;
    let password=req.body.password;
    if(username=='' || password==''){
      res.status(500);
      res.send('please give username and password to continue');
      return false;
    }
    var UserSchema = require('../schemas/UserSchema');


    // executes, passing results to callback
    UserSchema.userModel.find({ username: username}, function (err, docs) {
      if(docs.length!=0){
        res.status(500);
        res.send('user with name "'+username+'" already exist.please choose another username');
        return false;
      }else{
          let user_data = {
              username: username,
              password: password
          };
          var user = new UserSchema.userModel(user_data);
          user.save(function (err, user_data) {
              if (err) {
                  sendStatus(500);
              }
              req.session.user_id = user_data._id;
              res.send("hi"+username)
          });
      }
    });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'JOby' });
});
router.post('/login', function(req, res, next) {
    let username=req.body.username;
    let password=req.body.password;
    if(username=='' || password==''){
      res.status(500);
      res.send('please give username and password to continue');
      return false;
    }
    var UserSchema = require('../schemas/UserSchema');


    // executes, passing results to callback
    UserSchema.userModel.findOne({ username: username}, function (err, doc) {
      if(doc.length==0){
        res.status(500);
        res.send('NO SUCH USER FOUND');
        return false;
      }else{
        if(doc.password!=password){
          res.status(500);
          res.send('Wrong Password');
          return false;
        }
        req.session.user_id = doc._id;
        res.send('welcome '+username);
        return false;
         
      }
    });
});

module.exports = router;

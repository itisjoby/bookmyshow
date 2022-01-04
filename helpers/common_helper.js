var express = require('express');

function isAuthenticated(req, res, next) {
    if (req.session.user_id) {
        return next();
    }
    res.redirect('/');
  
  }
  

module.exports = {
    isAuthenticated:isAuthenticated,
    
};
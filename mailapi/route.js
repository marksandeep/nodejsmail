'use strict';

module.exports = function(app) {
  var funcList = require('../controllers/mailController');

  // todoList Routes
  app.route('/')
    .get(funcList.index)
};
module.exports.index = index
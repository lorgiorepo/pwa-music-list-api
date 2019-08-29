 var User       = require('../models/user.server.model'),
    _           = require('lodash'),
    fcm         = require('fcm-node'),
    secrets     = require('../../config/secrets');

module.exports = {


  /**
   * Send Notification to Users
   * @param  req
   * @param  res
   * @return json
   */
  notifyUsers: function(req, res){
    var sender = new fcm(secrets.fcm);

    // Prepare a message to be sent
    var message = {
      to: 'registration_token',
      collapse_key: 'your_collapse_key',
      notification: {
        title: 'Title of your push notification', 
        body: 'Body of your push notification' 
      },
      data: {
          my_key: 'my value',
          my_another_key: 'my another value'
      }
    };

    User.find({}, function(err, users) {

      // user subscription ids to deliver message to
      var user_ids = _.map(users, 'user_id');

      console.log("User Ids", user_ids);

      console.log('sender', sender);

      // Actually send the message
      sender.send(message, { registrationTokens: user_ids }, function (err, response) {
        if (err) {
            console.log('err', err);
        } else {
            console.log('response', response)
          return res.json(response);
        } 
      });
    });
   
  }
};
 var User       = require('../models/user.server.model'),
    _           = require('lodash'),
    gcm         = require('node-gcm'),
    secrets     = require('../../config/secrets');

module.exports = {


  /**
   * Send Notification to Users
   * @param  req
   * @param  res
   * @return json
   */
  notifyUsers: function(req, res){
    var sender = new gcm.Sender(secrets.fcm);

    // Prepare a message to be sent
    var message = new gcm.Message({
        contentAvailable: true,
        data: {
          title: 'Change'
        },
        notification: {
            title: "Hello, World",
            icon: "ic_launcher",
            body: "This is a notification that will be displayed if your app is in the background."
        }
    });
    message.addData('key1','message1');

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
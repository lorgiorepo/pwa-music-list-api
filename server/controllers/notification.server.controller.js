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

    var requestOptions = {
        Authorization: 'key=AAAAR6zbjlM:APA91bEZvz22XTQOgs2YA-cMqn16_1XsGVw2Z-SvBCVtnVEBSGIs-Pk5D6Y7oBTtcBzgmtcNXPpWxMh_wh7mst4bSbbXoYShtoLyO6P1v7rSRSYJIeDUr7p82X-307OmBoLZGNg1Psxx'
    };

    console.log('secrets.fcm', secrets.fcm);
    console.log('authorization', requestOptions);

    var sender = new gcm.Sender(secrets.fcm);

    // Prepare a message to be sent
    var message = new gcm.Message({
        notification: {
          title: "Hello, World",
          icon: "ic_launcher",
          body: "Click to see the latest commit"
        }
    });

    User.find({}, function(err, users) {

        console.log('users', users);

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
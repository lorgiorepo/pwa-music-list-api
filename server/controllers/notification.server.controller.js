var fcm         = require('fcm-notification');
var FCM         = new fcm('../../config/pwa-music-firebase-adminsdk-p8t70-8fac03917b.json');
var User        = require('../models/user.server.model');
var _           = require('lodash');

module.exports = {


  /**
   * Send Notification to Users
   * @param  req
   * @param  res
   * @return json
   */
  notifyUsers: function(req, res){
    
    User.find({}, function(err, users) {

      // user subscription ids to deliver message to
      var user_ids = _.map(users, 'user_id');
      console.log("User Ids", user_ids);

      // Prepare a message to be sent
      var message = {
        data: {    //This is only optional, you can send any data
            score: '850',
            time: '2:45'
        },
        notification:{
            title : 'Title of notification',
            body : 'Body of notification'
        },
        token : user_ids
      };

      FCM.send(message, function(err, response) {
        if (err){
          console.log('error found', err);
        } else {
          console.log('response here', response);
          return res.json(response);
        }
      });

      /* Actually send the message
      sender.send(message, { registrationTokens: user_ids }, function (err, response) {
        if (err) {
            console.log('err', err);
        } else {
            console.log('response', response)
          return res.json(response);
        } 
      });
      */
    });
   
  }
};
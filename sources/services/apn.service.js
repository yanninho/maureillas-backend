'use strict';

var apn = require('apn'),
    path = require('path'),
    config = require('../config/environment'),
    certPath = path.join(__dirname, '../config/cer', config.env),
    service = new apn.connection(
        { 'cert' : path.join(certPath , 'cert.pem'), 
          'key' : path.join(certPath , 'key.pem'),
          'ca' : [path.join(__dirname, '../config/cer', 'entrust_2048_ca.cer')]
        }
    );

service.on("connected", function() {
    console.log("Connected to APNS");
});

service.on("transmitted", function(notification, device) {
    console.log("Notification transmitted to:" + device.token.toString("hex"));
});

service.on("transmissionError", function(errCode, notification, device) {
    console.error("Notification caused error: " + errCode + " for device ", device, notification);
    if (errCode === 8) {
        console.log("A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
    }
});

service.on("timeout", function () {
    console.log("APNS Connection Timeout");
});

service.on("disconnected", function() {
    console.log("Disconnected from APNS");
});

service.on("socketError", console.error);

exports.sendMessage = function(registration_ids, message, feed, callback) {

    if (registration_ids === null) {
        callback('the first parameter must contains an array of registration ids');
        return;
    }
    if (registration_ids.length === 0) {
        callback('No user to send');
        return;
    }

    if (message === null) {
        callback('the second parameter must contains a message to send');
        return;
    }

    console.log("Sending the same notification each of the devices with one call to pushNotification.");
    var note = new apn.notification();
    note.setAlertTitle('Ville de Maureillas');
    note.setAlertText(message);
    note.payload = {'category' : 'feed'};
    note.badge = 1;

    service.pushNotification(note, registration_ids);
};
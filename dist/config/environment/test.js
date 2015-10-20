'use strict';

// Test specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/maureillas-tests'
  },
   gcm: {
    api_key: 'AIzaSyClUEmF927usWy1gAJskq4msdEcX0p5SZM',
    tests_devices: {
      android : ['APA91bHO1Sep-fF9UeIARAo8zmArttAsi3kp90TTwjajXW7EZhDGVBz1zdGAu876EsvQrW8KucP7M36K9w4yqLWX0p0tak87-OM0SagcsbqLWW_dd9B4ROc']
    }
  },
  apn: {
    app_id: 'y4nn5m@gmail.com'
  },
  security : '2LG5D0Ge0Lk31nrE3FN1J1EpqgzVpJzC'
};

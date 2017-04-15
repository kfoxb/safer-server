var admin = require("firebase-admin");

var serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-safer.firebaseio.com"
});


// https://firebase.google.com/docs/cloud-messaging/concept-options
//TODO: Set up messaging for an individual device
// https://firebase.google.com/docs/cloud-messaging/admin/send-messages
//TODO: Set up messaging for multiple devices
// https://firebase.google.com/docs/cloud-messaging/android/send-multiple
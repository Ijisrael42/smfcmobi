// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAjPYLPZnfhQYszOkRp4BcHtEvJc3NJ7js",
  authDomain: "test-f2acb.firebaseapp.com",
  databaseURL: "https://test-f2acb.firebaseio.com",
  projectId: "test-f2acb",
  storageBucket: "test-f2acb.appspot.com",
  messagingSenderId: "920422764087",
  appId: "1:920422764087:web:6c59d61950f847fcaaf9b2"
};

firebase.initializeApp(firebaseConfig);

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients.matchAll({
      type: "window"
    })
    .then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow) {
        // if(event.notification.data.url)
          return clients.openWindow(event.notification.data.url); 
        // else
        //   return clients.openWindow('https://netflix.com'); 
      }
    })
  );
});


// Retrieve firebase messaging
// const messaging = firebase.messaging && firebase.messaging.isSupported() ? firebase.messaging() : null;
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  // alert('Received background message ');

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "./logo192.png",
    vibrate: [200, 100, 200],
    badge: "./logo192.png",
    tag: "notification-1",
    renotify: true,
    data: { url: payload.data.click_action }, //the url which we gonna use later
    actions: [{action: "open_url", title: "Read Now"}]
  };

  self.addEventListener('push', function(event) {
    const promiseChain = self.registration.showNotification(notificationTitle,notificationOptions);
    event.waitUntil(promiseChain);
  });

});


importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)

firebase.initializeApp({
    apiKey: "AIzaSyCtbNEguSFo84dQG4w0lGe-zbdUo_a7wWY",
    authDomain: "devops-d85df.firebaseapp.com",
    projectId: "devops-d85df",
    storageBucket: "devops-d85df.appspot.com",
    messagingSenderId: "242392384836",
    appId: "1:242392384836:web:28c30980d5a7c12efc0311",
    measurementId: "G-6G6FMVYFBX",
});

const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
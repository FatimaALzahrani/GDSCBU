const firebaseConfig = {
    apiKey: "AIzaSyCayCRh3KS2ovE317Q3hPigFQx7MV9wptc",
    authDomain: "gdsc-12.firebaseapp.com",
    projectId: "gdsc-12",
    storageBucket: "gdsc-12.appspot.com",
    messagingSenderId: "190878539822",
    appId: "1:190878539822:web:1bf4d8550c05ab08987fbf",
    measurementId: "G-ZRDX984JGY"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, redirect to the protected page
        window.location.href = 'index.html'; 
      }
    });

    document.getElementById('login-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Successfully signed in
          const user = userCredential.user;
          // Redirect to the protected page
          window.location.href = 'index.html'; 
        })
        .catch((error) => {
          const errorMessage = error.message;
          // Display error message
          document.getElementById('error-message').innerText = errorMessage;
        });
    });
  });
window.onload = function () {
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');

  signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
  });





  const auth = firebase.auth();
  const studentSignUpForm = document.querySelector('#signup-form');
  const studentSignInForm = document.querySelector('#signin-form');
  const signupButtonForm = document.getElementById("sign-up-button");
  const signinButtonForm = document.getElementById("sign-in-button");

  //SIGNUP FUNCTION WORKS
  //NEED TO VALIDATE USER INPUT
  signupButtonForm.addEventListener('click', function () {

    var name = studentSignUpForm.name.value;
    var email = studentSignUpForm.email.value;
    var pass = studentSignUpForm.password.value;
    if (!email || !pass) {
      return alert("Email and password both required!");
    }
    console.log(pass);
    console.log(email);
    db.collection('student').doc(email).set({
      STU_NAME: studentSignUpForm.name.value,
      STU_SET: studentSignUpForm.set.value,
      STU_EMAIL: studentSignUpForm.email.value,
      STU_NICKNAME: studentSignUpForm.nickname.value
    });
    db.collection('student').doc(email).collection('tasks').doc().set(
      {ASSN_NAME : name + ' has task',
      CRS_NAME : '1113-Applied Math',
      DUE_DATE : '2020-12-08',
      TASK_DETAILS : "",
      TASK_TYPE : ""
    });
    //const signUpPromise = firebase.auth().createUserWithEmailAndPassword(email, pass);
    firebase.auth().createUserWithEmailAndPassword(email, pass).then((user) => {
        alert("Welcome to CST ", name, "!");
        window.location = "/home.html";
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
    //THIS WRITES IT TO THE DATABASE; DONT CHANGE
    
  });

  //SIGN IN AUTHENTICATION; DONT TOUCH
  signinButtonForm.addEventListener('click', function () {

    var name = studentSignInForm.name.value;
    var email = studentSignInForm.email.value;
    var pass = studentSignInForm.password.value;
    if (!email || !pass) {
      return alert("Email and password both required!");
    }

    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((user) => {
        //var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
          name = user.displayName;
          email = user.email;
        }
        alert("Welcome back ", name, "!");
        window.location = "/home.html";
        // ...
      })
      .catch((error) => {
        alert("Not a valid user!");
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });

    /*
    const signInPromise = firebase.auth().signInWithEmailAndPassword(email, pass)
    if(signInPromise){
      signInPromise.catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      })
      const hi = "hi";
    } else{
      alert("Welcome back ", name, "!");
      window.open(home.html)
    }*/

  });

  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.local)
  // .then(function() {
  //   // Existing and future Auth states are now persisted in the current
  //   // session only. Closing the window would clear any existing state even
  //   // if a user forgets to sign out.
  //   // ...
  //   // New sign-in will be persisted with session persistence.
  //   return firebase.auth().signInWithEmailAndPassword(email, pass);
  // })
  // .catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  // });
}
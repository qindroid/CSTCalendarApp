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
    /*
        const signUpPromise = firebase.auth().createUserWithEmailAndPassword(email, pass)
        if (signUpPromise.catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
          }))

          //const hi = "hi";
        else {
          alert("Welcome to the CST family ", name, "!");
        }
    */
    //THIS WRITES IT TO THE DATABASE; DONT CHANGE
    db.collection('student').add({
      STU_NAME: studentSignUpForm.name.value,
      STU_SET: studentSignUpForm.set.value,
      STU_EMAIL: studentSignUpForm.email.value,
      STU_NICKNAME: studentSignUpForm.nickname.value
    });
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
}
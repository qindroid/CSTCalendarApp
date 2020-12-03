/*
 *This is js file for login html
 *
 *@ Author Jashan Rai | Giwoun Bae | Shawn Qin 
 *@ Version 20.12.2
 * 
 */

window.onload = function () {
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');

  //move the window when user use sign in or sign up
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
    //create data fors current user
    db.collection('student').doc(email).set({
      STU_NAME: studentSignUpForm.name.value,
      STU_SET: studentSignUpForm.set.value,
      STU_EMAIL: studentSignUpForm.email.value,
      STU_NICKNAME: studentSignUpForm.nickname.value
    });

    //add a test data to personal task.
    db.collection('student').doc(email).collection('tasks').doc().set({
      ASSN_NAME: 'Welcome to CST',
      CRS_NAME: 'CST Introduction',
      DUE_DATE: '2020-12-02',
      TASK_DETAILS: "This is your checklist!",
      TASK_TYPE: "Other"
    });
    // sync data from global data to personal data
    var query = db.collection('tasks');
    query.orderBy("date", "desc");
    query.get().then((s) => {

      var n = 0;
      s.forEach(function (x) {
        n += 1;
        //copy these data to student collection.
        db.collection('student').doc(email).collection('sync').doc().set({
          CRS_NAME: x.data().CRS_NAME,
          ASSN_NAME: x.data().ASSN_NAME,
          TASK_TYPE: x.data().TASK_TYPE,
          DUE_DATE: x.data().DUE_DATE,
          TASK_DETAILS: x.data().TASK_DETAILS,
        });

      });
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
        var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
          name = user.displayName;
          email = user.email;
        }
        alert("Welcome back ", name, "!");
        window.location = "/home.html";
      })
      .catch((error) => {
        alert("Not a valid user!");
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  });
}
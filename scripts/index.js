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
const studentInfoForm = document.querySelector('#signup-form');

studentInfoForm.querySelector('#sign-up').addEventListener('sign-up', function(e) {
  //e.preventDefault();
  db.collection('student').add({
      STU_NAME: studentInfoForm.signupName.value,
      STU_SET: studentInfoForm.signupSet.value,
      STU_EMAIL: studentInfoForm.signupEmail.value,
      STU_NICKNAME: studentInfoForm.signupNickname.value
  });
  studentInfoForm.signupName.value = '';
  studentInfoForm.signupSet.value = '';
  studentInfoForm.signupEmail.value = '';
  studentInfoForm.signupNickname.value = '';
  studentInfoForm.signupPassword.value = '';
  
  var signupEmail = document.getElementById("signupEmail");
  var signupPassword = document.getElementById("signupPassword");
  const signupPromise = auth.createUserWithEmailAndPassword(signupEmail.value, signupPassword.value)
  signupPromise.catch(e => alert(e.message));
  alert("Signed up successfully!");
  
});

document.querySelector('#sign-in').addEventListener('click', function(e) {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in 
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  
  // Step 2
  //  Get a credential with firebase.auth.emailAuthProvider.credential(emailInput.value, passwordInput.value)
  //  If there is no current user, log in with auth.signInWithCredential(credential)
  //  If there is a current user an it's anonymous, atttempt to link the new user with firebase.auth().currentUser.link(credential) 
  //  The user link will fail if the user has already been created, so catch the error and sign in.
});
/*
function login(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value)
    window.location = 'home.html';
    promise.catch(e => alert(e.message));
    alert("Signed in successfully!");
};



studentInfoForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  db.collection('student').add({
      STU_NAME: studentInfoForm.signupName.value,
      STU_SET: studentInfoForm.signupSet.value,
      STU_EMAIL: studentInfoForm.signupEmail.value,
      STU_NICKNAME: studentInfoForm.signupNickname.value
  });
  studentInfoForm.signupName.value = '';
  studentInfoForm.signupSet.value = '';
  studentInfoForm.signupEmail.value = '';
  studentInfoForm.signupNickname.value = '';
  studentInfoForm.signupPassword.value = '';
  window.location = 'home.html';
});
*/

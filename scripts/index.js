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

function signup(){
  var signupName = document.getElementById("signupName").value;
  var signupNickname = document.getElementById("signupNickname").value;
  var signupSet = document.getElementById("signupSet").value;
  var signupEmail = document.getElementById("signupEmail").value;
  var signupPassword = document.getElementById("signupPassword").value;
  const signupPromise = auth.createUserWithEmailAndPassword(signupEmail.value, signupPassword.value);
};

function login(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value)
    window.location = 'home.html';

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


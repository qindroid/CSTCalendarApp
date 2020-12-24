# CST SET A Calendar

### Author: Jashan Rai | Giwoun Bae | Shawn Qin

### Version 20.12.2

* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#Features)
* [Usage](#Usage)
* [Contents](#content)
* [Contributing](#Contributing)

## General Info
This is a browser based web application to allow BCIT CST SET A students to schedule school related tasks, assignments, deadlines into one consolidated calendar and also view them all in one place, along with their professor contact information and lecture room links.
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* JQuery
* Firebase

## Features
* Secured login
* Personal data solution
* using Firestore for real-time updates

## Usage

### firebase

#### Sign up new users
Create a form that allows new users to register with your app using their email address and a password. When a user completes the form, validate the email address and password provided by the user, then pass them to the createUserWithEmailAndPassword method:

```firebase
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in 
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

```

#### Sign in existing users
Create a form that allows existing users to sign in using their email address and password. When a user completes the form, call the signInWithEmailAndPassword method:

```firebase
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in 
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
```

#### Get the currently signed-in user
The recommended way to get the current user is by setting an observer on the Auth object:

```firebase
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
```

#### Get a user's profile

To get a user's profile information, use the properties of an instance of User.

```firebase
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}
```
#### Basic write operations
For basic write operations, you can use set() to save data to a specified reference, replacing any existing data at that path. For example a social blogging application might add a user with set() as follows:

```firebase
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
```

#### Delete documents
To delete a document, use the delete() method:

```firebase
db.collection("cities").doc("DC").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
```
#### Delete fields
To delete specific fields from a document, use the FieldValue.delete() method when you update a document:

```firebase
var cityRef = db.collection('cities').doc('BJ');

// Remove the 'capital' field from the document
var removeCapital = cityRef.update({
    capital: firebase.firestore.FieldValue.delete()
});
```

#### Simple queries
The following query returns all cities with state CA:

```firebase
// Create a reference to the cities collection
var citiesRef = db.collection("cities");

// Create a query against the collection.
var query = citiesRef.where("state", "==", "CA");
```

## Content

index.html as the land page of this project.

Content of the project folder:

```

Comp1800-group5
├─ .DS_Store
├─ .firebase
│  └─ hosting..cache
├─ .firebaserc
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ HEAD
│  │           └─ main
│  ├─ objects
│  │  ...
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-bf132e5a9f4a1541ae78d108a140870ceb381bb1.idx
│  │     └─ pack-bf132e5a9f4a1541ae78d108a140870ceb381bb1.pack
│  ├─ ORIG_HEAD
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ HEAD
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ 404.html
├─ calendar.html
├─ courses.html
├─ datepicker.html
├─ firebase.json
├─ firestore.indexes.json
├─ firestore.rules
├─ home.html
├─ index.html
├─ README.md
├─ scripts
│  ├─ .DS_Store
│  ├─ calendar.js
│  ├─ courses.js
│  ├─ firebase_api.js
│  ├─ home.js
│  └─ index.js
└─ styles
   ├─ .DS_Store
   ├─ bootstrap.min.css
   ├─ calendar.css
   ├─ courses.css
   ├─ datepicker.css
   ├─ home-style.css
   └─ index.css

```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[License](https://choosealicense.com/licenses/)
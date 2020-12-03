    /*
     *This is js file for course html
     *
     *@ Author Jashan Rai | Giwoun Bae | Shawn Qin 
     *@ Version 20.12.2
     * 
     */

    //Logout button functionality
    //Sign-out function for course page
    logoutBtn = document.getElementById("logout-button");
    logoutBtn.addEventListener('click', function () {
        firebase.auth().signOut().then(function () {
            alert("Signed out successfully!");
            window.location = 'index.html';
            // Sign-out successful.
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // An error happened.
        })
    });
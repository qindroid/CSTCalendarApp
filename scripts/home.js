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
var query = db.collection('tasks').orderBy("date", "desc");
query.get().then((s) => {
    var n = 0;
    s.forEach(function(x){
       $("#recent-updates-table").append(`
 
    
          <tr>
            <td>` + (n+1) +`</td><td>`+ x.data().course +`</td><td>` + x.data().taskname +`</td><td>`+ x.data().type + `</td><td>` + x.data().date + '/' + x.data().month + `</td><td>` + x.data().detail + `</td></tr>
 `);
 
       n += 1;
    });
 });

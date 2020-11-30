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
var query = db.collection("tasks");
var newquery = query.orderBy("DUE_DATE", "asc")
newquery.get().then((s) => {
    var n = 0;
    s.forEach(function(x){
       $("#recent-updates-table").append(`
 
    
          <tr>
            <td>` + (n+1) +`</td><td>`+ x.data().CRS_NAME +`</td><td>` + x.data().ASSN_NAME +`</td><td>`+ x.data().TASK_TYPE + `</td><td>` + x.data().DUE_DATE + `</td><td>` + x.data().TASK_DETAILS + `</td></tr>
        `);
 
       n += 1;
    });
 });

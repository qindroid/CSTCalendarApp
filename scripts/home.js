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
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email);
        console.log(user);
        db.collection('student').where('STU_EMAIL', '==', String(user.email)).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var query = db.collection("student").doc(doc.id).collection("tasks");
                    var newquery = query.orderBy("DUE_DATE", "asc")
                    newquery.get().then((s) => {
                        var n = 0;
                        s.forEach(function (x) {
                            $("#recent-updates-table").append(`<tr class = " "><td>` + (n + 1) + `</td><td>` + x.data().CRS_NAME + `</td><td>` + x.data().ASSN_NAME + `</td><td><i><b>user:</b></i><br> ` + x.data().TASK_TYPE + ` </td><td>` + x.data().DUE_DATE + `</td><td>` + x.data().TASK_DETAILS + `</td></tr>`);
                            n += 1;
                        });
                    });
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    } else {

    }
});


var query = db.collection("tasks");
var newquery = query.orderBy("DUE_DATE", "asc")
newquery.get().then((s) => {
    var n = 1;
    s.forEach(function (x) {
        $("#recent-updates-table").append(` 
          <tr>
            <td>` + (n + 1) + `</td><td>` + x.data().CRS_NAME + `</td><td>` + x.data().ASSN_NAME + `</td><td><i><b>system: </b></i><br> ` + x.data().TASK_TYPE + `</td><td>` + x.data().DUE_DATE + `</td><td>` + x.data().TASK_DETAILS + `</td></tr>
        `);

        n += 1;
    });
});

var taskForm = document.getElementById("taskForm");


//add firebase databases

addBtn = document.getElementById("addassignment");
$(addBtn).click(function (event) {
    console.log(taskForm.password.value);
    if (taskForm.password.value == 123) {
        db.collection('tasks').doc().set({
            CRS_NAME: taskForm.crsName.value,
            ASSN_NAME: taskForm.assignmentName.value,
            TASK_TYPE: taskForm.taskType.value,
            DUE_DATE: taskForm.dueDate.value,
            TASK_DETAILS: taskForm.taskDetails.value,
        });

        taskForm.crsName.value = '';
        taskForm.taskType.value = '';
        taskForm.dueDate.value = '';
        taskForm.taskDetails.value = '';
        taskForm.assignmentName.value = '';
        $('#taskType').prop('selected', function () {
            return this.defaultSelected;
        });

        $('#assignmentName').prop('selected', function () {
            return this.defaultSelected;
        });
        alert("Added Successfully!");
        $('#closebutton').trigger('click');
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
});
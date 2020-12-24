/*
 *This is js file for home html
 *
 *@ Author Jashan Rai | Giwoun Bae | Shawn Qin 
 *@ Version 20.12.2
 * 
 */

//logout function for log out button
logoutBtn = document.getElementById("logout-button");
logoutBtn.addEventListener('click', function () {
    firebase.auth().signOut().then(function () {
        alert("Signed out successfully!");
        window.location = 'index.html';
        // Sign-out successful.
    }).catch(function (error) {
        //error alert
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // An error happened.
    })
});

//get current user for reading user email.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email);
        //serach doc contain email for current user
        db.collection('student').where('STU_EMAIL', '==', String(user.email)).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    //get data from persoanl tasks collection
                    var query = db.collection("student").doc(doc.id).collection("tasks");
                    var newquery = query.orderBy("DUE_DATE", "asc")
                    newquery.get().then((s) => {
                        var n = 0;
                        s.forEach(function (x) {
                            //get data and add it the the recent update table
                            $("#recent-updates-table").append(`<tr class = " "><td>` + (n + 1) + `</td><td>` + x.data().CRS_NAME + `</td><td>` + x.data().ASSN_NAME + `</td><td><i><b>personal:</b></i><br> ` + x.data().TASK_TYPE + ` </td><td>` + x.data().DUE_DATE + `</td><td>` + x.data().TASK_DETAILS + `</td></tr>`);
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

//read global tasks database 
var query = db.collection("tasks");
var newquery = query.orderBy("DUE_DATE", "asc")
newquery.get().then((s) => {
    var n = 1;
    s.forEach(function (x) {
        //add global tasks to recent update table.
        $("#recent-updates-table").append(` 
          <tr>
            <td>` + (n + 1) + `</td><td>` + x.data().CRS_NAME + `</td><td>` + x.data().ASSN_NAME + `</td><td><i><b>global: </b></i><br> ` + x.data().TASK_TYPE + `</td><td>` + x.data().DUE_DATE + `</td><td>` + x.data().TASK_DETAILS + `</td></tr>
        `);

        n += 1;
    });
});

//add global data to firestore
var taskForm = document.getElementById("taskForm");
//add firebase databases from the pop up windows
addBtn = document.getElementById("addassignment");
$(addBtn).click(function (event) {
    console.log(taskForm.password.value);
    //you don't see anything here.
    if (taskForm.password.value == 123) {
        //add data to global tasks collection with random id.
        db.collection('tasks').doc().set({
            CRS_NAME: taskForm.crsName.value,
            ASSN_NAME: taskForm.assignmentName.value,
            TASK_TYPE: taskForm.taskType.value,
            DUE_DATE: taskForm.dueDate.value,
            TASK_DETAILS: taskForm.taskDetails.value,
        });
        //set value to empty
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
        //pop up window after adding a task
        alert("Added Successfully!");
        $('#closebutton').trigger('click');
        //auto refresh windows in 1s
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
});
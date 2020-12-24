/*
 *This is js file for calendar html
 *
 *@ Author Jashan Rai | Giwoun Bae | Shawn Qin 
 *@ Version 20.12.2
 * 
 */

//Logout button functionality, logout current user.
logoutBtn = document.getElementById("logout-button");
logoutBtn.addEventListener('click', function () {
    firebase.auth().signOut().then(function () {
        alert("Signed out successfully!");
        window.location = 'index.html';
        // Sign-out successful.
    }).catch(function (error) {
        //read the error code
        //then pop the error windows
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // An error happened.
    })
});

//check current user
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //find the collection where is the same as email
        db.collection('student').where('STU_EMAIL', '==', String(user.email)).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // print doc id in consle for testing
                    //console.log(doc.id, " => ", doc.data());
                    
                    var deleteiltem;
                    var splitstring = [];
                    //create a list for checked items
                    var list = [];
                    //delete button delete checked checkbox
                    $('#delete').click(function () {
                        //get the checked items.
                        $.each($(".checkbox input:checked"), function () {
                            list.push($(this).next().html());
                        });

                        //searching the keywords in checkbox span to match keywords in firebase
                        //WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        //DO NOT CHANGE CHECKBOX STRING FORMAT ON BOTTOM -Shawn
                        //using special char to find keywords 
                        //using * and @ find ASSN_NAME
                        //using : and . find DUE_DATE
                        for (var i = 0; i < list.length; i++) {
                            deleteiltem = list[i];
                            var delete_crs = deleteiltem.substring(
                                deleteiltem.lastIndexOf("*") + 1,
                                deleteiltem.lastIndexOf("@")
                            );
                            var delete_date = deleteiltem.substring(
                                deleteiltem.lastIndexOf(":") + 1,
                                deleteiltem.lastIndexOf(".")
                            );

                            //get the doc id by seaching the fields
                            db.collection('student').doc(doc.id).collection('tasks').where('ASSN_NAME', '==', delete_crs).where('DUE_DATE', '==', delete_date).get()
                                .then(function (querySnapshot) {
                                    querySnapshot.forEach(function (doc1) {
                                        // print doc id in consle for testing
                                        //console.log(doc1.id, " => ", doc1.data());
                                        //delete the doc
                                        db.collection("student").doc(doc.id).collection('tasks').doc(doc1.id).delete();
                                    });
                                })
                                .catch(function (error) {
                                    console.log("Error getting documents: ", error);
                                });
                            
                            //search tasks under sync collections
                            db.collection('student').doc(doc.id).collection('sync').where('ASSN_NAME', '==', delete_crs).where('DUE_DATE', '==', delete_date).get()
                                .then(function (querySnapshot) {
                                    querySnapshot.forEach(function (doc1) {
                                        //delete the doc from results
                                        db.collection("student").doc(doc.id).collection('sync').doc(doc1.id).delete();
                                    });
                                })
                                .catch(function (error) {
                                    //print error code
                                    console.log("Error getting documents: ", error);
                                });
                        }
                        //remove the checked checkbox from web page
                        $(".checkbox input:checked").parent().remove();
                    });

                    //create a empty collection under current user.
                    db.collection('student').doc(doc.id).collection('tasks').doc('test').set({});
                    //add firebase databases
                    var taskForm = document.getElementById("taskForm");
                    addBtn = document.getElementById("addassignment");
                    $(addBtn).click(function (event) {
                        //add data to the current user tasks personal tasks collection.
                        db.collection('student').doc(doc.id).collection('tasks').doc().set({
                            CRS_NAME: taskForm.crsName.value,
                            ASSN_NAME: taskForm.assignmentName.value,
                            TASK_TYPE: taskForm.taskType.value,
                            DUE_DATE: taskForm.dueDate.value,
                            TASK_DETAILS: taskForm.taskDetails.value,
                        });
                        //reset the variables to empty
                        taskForm.crsName.value = '';
                        taskForm.taskType.value = '';
                        taskForm.dueDate.value = '';
                        taskForm.taskDetails.value = '';
                        taskForm.assignmentName.value = '';
                        
                        //read default select option
                        $('#taskType').prop('selected', function () {
                            return this.defaultSelected;
                        });

                        $('#assignmentName').prop('selected', function () {
                            return this.defaultSelected;
                        });

                        //pop up windows for the add tasks
                        alert("Added Successfully!");
                        $('#closebutton').trigger('click');
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    });

                    //add firebase databases for adding tasks.
                    var query = db.collection("student").doc(doc.id).collection('tasks');
                    var newquery = query.orderBy("DUE_DATE", "asc")
                    newquery.get().then((s) => {
                        var n = 0;
                        s.forEach(function (x) {
                            n += 1;
                            $("#recent-updates-table").append(`<tr><td class="bg-secondary text-white">` + x.data().CRS_NAME + `</td><td>` + x.data().ASSN_NAME + `</td><td>` + x.data().DUE_DATE + `</td></tr>`);
                            console.log(n);
                            //make sure checklist less than 20 lists
                            if (n <= 20) {
                                //append firebase data to checklist
                                //Please dont change anything in append
                                $("#cb").append(`<div class="checkbox bg-secondary text-white"<label>` + n + " " + `<input type="checkbox" value=""><span>Course: ` + x.data().CRS_NAME + ` *` + x.data().ASSN_NAME + `@ DATE:` + x.data().DUE_DATE + `.</span></label></div> `);
                            }
                            //fix the bug after data name changed in firestore
                            //convert DUE_DATE to var date :) 11-28 2:07AM Shawn
                            var str = String(x.data().DUE_DATE);
                            date = String(parseInt(str.substr(-2)));
                            //search calendar for specific date
                            $('.date.col-1').each(function (index) {
                                //check the date and append the date from firebase
                                if ($(this).text() === date) {
                                    $(this).parent().parent().append(
                                        `<a class="event d-block p-1 pl-2 pr-2 mb-1 rounded text-truncate small bg-secondary text-white" title=` + x.data().ASSN_NAME + `>` + x.data().CRS_NAME + " " + x.data().ASSN_NAME + `</a>`);
                                    $(this).parent().siblings("p").remove();
                                }
                            });
                        });
                    });

                    //direct to the sync collections.
                    //sync collection is the copy from tasks collection.
                    var query = db.collection("student").doc(doc.id).collection('sync');
                    var newquery = query.orderBy("DUE_DATE", "asc")
                    newquery.get().then((s) => {
                        var n = 0;
                        s.forEach(function (x) {
                            n += 1;
                            //$("#recent-updates-table").append(`<tr><td class="bg-secondary text-white">` + x.data().CRS_NAME + `</td><td>` + x.data().ASSN_NAME + `</td><td>` + x.data().DUE_DATE + `</td></tr>`);
                            console.log(n);

                            //make sure checklist less than 20 lists
                            if (n <= 20) {
                                //append firebase data to checklist
                                //Please dont change anything in append
                                $("#cb").append(`<div class="checkbox bg-secondary text-white"<label>` + n + " " + `<input type="checkbox" value=""><span>Course: ` + x.data().CRS_NAME + ` *` + x.data().ASSN_NAME + `@ DATE:` + x.data().DUE_DATE + `.</span></label></div> `);
                            }
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

//following function read each tasks and add to the table
var query = db.collection('tasks')
var newquery = query.orderBy("DUE_DATE", "asc");
newquery.get().then((s) => {
    var n = 0;
    s.forEach(function (x) {
        n += 1;
        //add the global tasks to local web page in recent update table.
        $("#recent-updates-table").append(`                       
                  <tr><td class="bg-primary text-white">` + x.data().CRS_NAME + `</td><td>` + x.data().ASSN_NAME + `</td><td>` + x.data().DUE_DATE + `</td></tr>
         `);

        //fix the bug after data name changed in firestore
        //convert DUE_DATE to var date :) 11-28 2:07AM Shawn
        var str = String(x.data().DUE_DATE);
        date = String(parseInt(str.substr(-2)));
        //search calendar for specific date
        $('.date.col-1').each(function (index) {
            //check the date and append the date from firebase
            if ($(this).text() === date) {
                //add the task from global data to calendar view.
                $(this).parent().parent().append(
                    `<a class="event d-block p-1 pl-2 pr-2 mb-1 rounded text-truncate small bg-primary text-white"
                    title="Test">` + x.data().CRS_NAME + " " + x.data().ASSN_NAME + `</a>`);
            }
        });
    });
});

// Get the modal
var modal = document.getElementById("myModal1");
// Get the button that opens the modal
var btn = document.getElementById("delete");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close1")[0];
// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    setTimeout(function () {
        location.reload();
    }, 400);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        setTimeout(function () {
            location.reload();
        }, 400);
    }
}
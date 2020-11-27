    var date = "default";
    var course = "default"; //month to course
    var taskname = "default";
    var details = "default";
    var tasktype = "default";
    var i = 0;
    // var database = firebase.database();
    // var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
    // starCountRef.on('value', function (snapshot) {
    //     updateStarCount(postElement, snapshot.val());
    // });
    $(document).ready(function () {

        console.log($("span.col-1").text());
        //read tasks data from firebase

        // read input from textfield
        $("select.course").change(function () {
            course = $(this).children().children("option:selected").val();
            console.log(month);
        });


        $("select.date").change(function () {
            date = $(this).children().children("option:selected").val();
            console.log(date);

        });

        $("select.tasktype").change(function () {
            tasktype = $(this).children().children("option:selected").val();
            console.log(tasktype);
        });

        $("input.taskname").change(function () {
            taskname = $(this).val();
            console.log(taskname);
        });


        $("input.details").change(function () {
            details = $(this).val();
            console.log(details);
        });

        console.log("Hello world!");

        // //const taskList = document.querySelector('');
        // const taskForm = document.querySelector('#taskForm')

        // //create element and render student list
        // function renderCourse(doc){
        //     let li = document.createElement('li');
        //     let crsName = document.createElement('div');
        //     //let crsDetail = document.createElement('div');
        //     let taskType = document.createElement('div');
        //     let dueDate = document.createElement('div');
        //     let taskDetails= document.createElement('div');

        //     li.setAttribute('data-id', doc.id);
        //     crsName.textContent = doc.data().CRS_NAME;
        //     taskType.textContent = doc.data().TASK_TYPE;
        //     dueDate.textContent = doc.data().DUE_DATE;
        //     taskDetails.textContent = doc.data().TASK_DETAILS;

        //     li.appendChild(crsName);
        //     li.appendChild(taskType);
        //     li.appendChild(dueDate);
        //     li.appendChild(taskDetails);

        //     taskForm.appendChild(li);
        // }

        // //saving student information
        // form.addEventListener('submit', (e) =>{
        //     //e.preventDefault();
        //     db.collection('assignments').add({
        //         CRS_NAME: taskForm.crsName.value,
        //         TASK_TYPE: taskForm.taskType.value,
        //         DUE_DATE: taskForm.dueDate.value,
        //         TASK_DETAILS: taskForm.taskDetails.value,
        //     });
        //     taskForm.crsName.value = '';
        //     taskForm.taskType.value = '';
        //     taskForm.dueDate.value = '';
        //     taskForm.taskDatails.value = '';
    });
    /*
                //add button and add stuff from textfield
                 $('#add').click(function () {
                     console.log("test");

                     // Get the button that opens the modal
                     var btn = document.getElementById("add");

                //     // Get the <span> element that closes the modal
                     var span = document.getElementsByClassName("close")[0];

                //     // When the user clicks the button, open the modal 
                     btn.onclick = function () {
                         modal.style.display = "block";
                     }

                //     // When the user clicks on <span> (x), close the modal
                     span.onclick = function () {
                         modal.style.display = "none";
                     }

                //     // When the user clicks anywhere outside of the modal, close it
                     window.onclick = function (event) {
                         if (event.target == modal) {
                             modal.style.display = "none";
                         }
                     }

                     $('.date.col-1').each(function (index) {
                         console.log($(this).text() === date);

                         if ($(this).text() === date) {
                             $(this).parent().parent().append(
                                `<a class=\\"event d-block p-1 pl-2 pr-2 mb-1 rounded text-truncate small bg-success text-white\\" title=\\"Test Event\\">${taskname}</a>`);

                         }
                     });

                 });
    */
    //delete button delete checked checkbox
    $('#delete').click(function () {
        console.log("test");
        $(".checkbox input:checked").parent().remove();

    });

    //add firebase databases
    var taskForm = document.getElementById("taskForm");
    addBtn = document.getElementById("addassignment");
    $(addBtn).click(function (event) {
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
    });


    //add firebase databases for adding tasks.



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


    var query = db.collection('tasks')
    query.orderBy("date", "desc");
    query.get().then((s) => {

        var n = 0;
        s.forEach(function (x) {
            n += 1;
            $("#recent-updates-table").append(`
         
                
                  <tr><td>` + x.data().CRS_NAME + `</td><td>` + x.data().ASSN_NAME + `</td><td>` + x.data().DUE_DATE + `</td></tr>
         `);
            console.log(n);

            //make sure checklist less than 20 lists
            if (n <= 20) {
                //append firebase data to checklist
                $("#cb").append(`<div class="checkbox"<label>` + n + " " + `<input type="checkbox" value=""><span>Course:      
                   ` + x.data().CRS_NAME + `, ` + x.data().ASSN_NAME + ` DATE: ` + x.data().DUE_DATE + `</span></label>
                   </div> 
         `);
            }
            //search calendar for specific date
            $('.date.col-1').each(function (index) {
                console.log($(this).text() === x.data().date);

                //check the date and append the date from firebase
                if ($(this).text() === x.data().date) {
                    $(this).parent().parent().append(
                        `<a class="event d-block p-1 pl-2 pr-2 mb-1 rounded text-truncate small bg-primary text-white"
                    title="Test">` + x.data().taskname + " " + x.data().course + `</a>`);

                }
            });
        });
    });
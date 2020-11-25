var date = "default";
        var month = "default";
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
            $("select.month").change(function () {
                month = $(this).children().children("option:selected").val();
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



            //add button and add stuff from textfield
            $('#add').click(function () {
                console.log("test");

                // Get the modal
                var modal = document.getElementById("myModal");

                // Get the button that opens the modal
                var btn = document.getElementById("add");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                // When the user clicks the button, open the modal 
                btn.onclick = function () {
                    modal.style.display = "block";
                }

                // When the user clicks on <span> (x), close the modal
                span.onclick = function () {
                    modal.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
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

            //delete button delete checked checkbox
            $('#delete').click(function () {
                console.log("test");
                $(".checkbox input:checked").parent().parent().remove();

            });

            //add firebase databases
            $("#add").on("click", function (event) {
                db.collection("tasks").doc().set({

                    month: month.valueOf(),

                    date: date.valueOf(),

                    type: tasktype.valueOf(),

                    taskname: taskname.valueOf(),

                    detail: details.valueOf(),
                });
            });
        });

        logoutBtn = document.getElementById("logout-button");
        logoutBtn.addEventListener('click', function () {
          firebase.auth().signOut().then(function() {
            alert("Signed out successfully!");
            window.location = 'index.html';
            // Sign-out successful.
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // An error happened.
          })});


          var query = db.collection('tasks').orderBy("date", "desc");
            query.get().then((s) => {
    
            var n = 0;
            s.forEach(function(x){
               $("#recent-updates-table").append(`
         
                
                  <tr><td>`+ x.data().course +`</td><td>` + x.data().taskname +`</td><td>` + x.data().date + '/' + x.data().month + `</td></tr>
         `);
         
               n += 1;
            });
         });



        $(document).ready(function () {

        });
var date;
var month;
var taskname;
var details;
var tasktype;
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

    $('.date.col-1').each(function (index) {
      console.log($(this).text() === date);

      if ($(this).text() === date) {
        $(this).parent().parent().append(
          '<a class="event d-block p-1 pl-2 pr-2 mb-1 rounded text-truncate small bg-success text-white" title="Test Event">' +
          taskname + '</a>');

      }
    });

  });

  //delete button delete checked checkbox
  $('#delete').click(function () {
    console.log("test");
    $(".checkbox input:checked").parent().parent().remove();

  });
  var taskForm = document.querySelector("task-form");
  //add firebase databases
  $("#add").on("click", function () {
    
    db.collection('tasks').add({

      month: month.valueOf(),

      date: taskForm.date.valueOf(),

      type: taskForm.tasktype.valueOf(),


      taskname: taskForm.taskname.valueOf(),


      detail: details.valueOf(),

    });
    console.log(taskForm.month.value,taskForm.date.value)
  });
});



$(document).ready(function () {

});

/* 
//WRITE TO THE RECENT UPDATES SECTION
const functions = require('firebase-functions');

exports.useWilcard = functions.firestore
  .document('tasks/{documentId}')
  .onCreate((change, context) => {

    const newTask = snap.data();

    var recentUpdate = document.getElementById("recent_update1");
    recentUpdate.innerHTML = newTask.taskname + " " + date + "/" + data + " " + detail;

    /* ... 
  });*/
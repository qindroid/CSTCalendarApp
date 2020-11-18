const courseList = document.querySelector('#courselist');
const courseForm = document.querySelector('#add-course-info');

//create element and render student list
function renderCourse(doc){
    let li = document.createElement('li');
    let crsName = document.createElement('div');
    let crsDetail = document.createElement('div');
    let crsSchedule = document.createElement('div');
    let studentName= document.createElement('div');

    li.setAttribute('data-id', doc.id);
    crsName.textContent = doc.data().CRS_NAME;
    crsDetail.textContent = doc.data().CRS_DETAIL;
    crsSchedule.textContent = doc.data().CRS_SCHEDULE;
    studentName.textContent = doc.data().STU_NAME;

    li.appendChild(crsName);
    li.appendChild(crsDetail);
    li.appendChild(crsSchedule);
    li.appendChild(studentName);

    courseList.appendChild(li);
}

//getting data
db.collection("course").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCourse(doc);
    });
})

//saving student information
courseForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('course').add({
        CRS_NAME: courseForm.crsName.value,
        CRS_DETAIL: courseForm.crsDetail.value,
        CRS_SCHEDULE: courseForm.crsSchedule.value,

    });
    courseForm.crsName.value = '';
    courseForm.crsDetail.value = '';
    courseForm.crsSchedule.value = '';
})
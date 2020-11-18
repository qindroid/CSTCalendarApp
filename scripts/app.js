const studentList = document.querySelector('#studentList');
const studentInfoForm = document.querySelector('#add-student-info');

//create element and render student list
function renderStudent(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let set = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().STU_NAME;
    set.textContent = doc.data().STU_SET;

    li.appendChild(name);
    li.appendChild(set);

    studentList.appendChild(li);
}

//getting data
db.collection("student").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderStudent(doc);
    });
})

//saving student information
studentInfoForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('student').add({
        STU_NAME: studentInfoForm.studentName.value,
        STU_SET: studentInfoForm.set.value,
        STU_EMAIL: studentInfoForm.email.value,
        STU_NICKNAME: studentInfoForm.nickname.value
    
    });
    studentInfoForm.studentName.value = '';
    studentInfoForm.set.value = '';
    studentInfoForm.email.value = '';
    studentInfoForm.nickname.value = '';

})
const taskList = document.querySelector('');
const TASK = document.querySelector('')

//create element and render student list
function renderCourse(doc){
    let li = document.createElement('li');
    let crsName = document.createElement('div');
    //let crsDetail = document.createElement('div');
    let taskType = document.createElement('div');
    let dueDate = document.createElement('div');
    let taskDetails= document.createElement('div');

    li.setAttribute('data-id', doc.id);
    crsName.textContent = doc.data().CRS_NAME;
    taskType.textContent = doc.data().TASK_TYPE;
    dueDate.textContent = doc.data().DUE_DATE;
    taskDetails.textContent = doc.data().TASK_DETAILS;

    li.appendChild(crsName);
    li.appendChild(taskType);
    li.appendChild(dueDate);
    li.appendChild(taskDetails);

    TAKS.appendChild(li);
}

//saving student information
courseForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('task').add({
        CRS_NAME: TASK.crsName.value,
        TASK_TYPE: TASK.taskType.value,
        DUE_DATE: TASK.dueDate.value,
        TASK_DETAILS: TASK.taskDetails.value,

    });
    TASK.crsName.value = '';
    TASK.taskType.value = '';
    TASK.dueDate.value = '';
    TASK.taskDatails.value = '';
})
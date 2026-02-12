const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
// const submitTask = document.getElementById("addIcon");
const taskInput = document.getElementById("taskInput");


let tasks = [];


//add a new task to the list and render
function addTask(){

    const text = taskInput.value.trim(); //get the input from the user and trim the extra spaces

    if(text === "") return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    }

    tasks.push(newTask);

    taskInput.value = ""; //clear all the data if any in the input field

    renderTasks(); //to render update every time state changes
}


//function to render the lists
function renderTasks(){

    taskList.innerHTML = ""; // clearing the older list, so that we can render from scratch everytime

    for(let  i = 0 ; i < tasks.length ; i++){

        const task = tasks[i];

        //Li container
        const li = document.createElement("li");
        li.classList.add("taskItem");

        //Task checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function(){
            toggleTask(task.id);
        })

        //Task Text
        const span = document.createElement("span");
        span.textContent = task.text;

        //updating the text if task completed
        if(task.completed){
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.6";
        }

        

        //Delete Task
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        //delete task
        deleteBtn.addEventListener("click", function(){
            deleteTask(task.id);
        });


        //add required elements to li container to show
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    }
}

function deleteTask(id){

    //using filter array to remove the tasks -> function keep the element where condition matches
    tasks = tasks.filter(function (task) {
        return task.id !== id; //it says -> keep this task only if it's not equal with the id we want to delete
    });

    renderTasks();
}


function toggleTask(id) {
    for(let i = 0 ; i < tasks.length ; i++){
        if(tasks[i].id === id){
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }

    renderTasks();
}


//event Listener
taskForm.addEventListener("submit", function(event){
    event.preventDefault(); //stop page reload
    addTask();
})



import Task from "./Task.js";
import TaskService from "./TaskService.js";
import Validation from "./Validation.js";

const service = new TaskService();
const validation = new Validation();

const getEleID = (id) => (document.getElementById(id));
const getEleClass = (className) => (document.getElementsByClassName(className));

let isLoading = false;
const checkLoading = (isLoading) => {
    if (isLoading){
        getEleID("myBody").classList.add("loading");
        getEleClass("card")[0].style.display = "none";
    }
    if(!isLoading){
        getEleID("myBody").classList.remove("loading");
        getEleClass("card")[0].style.display = "block";
    }
}

const fetchData = () => {
    isLoading = true;
    checkLoading(isLoading);
    service.getListTaskApi()
        .then((result) => {
            // console.log(result);
            renderData(result.data);
            isLoading = false;
            checkLoading(isLoading);
        })
        .catch((error) => {
            alert(error);
        })
}
fetchData();

const renderData = (data) => {
    let content_todo = "";
    let content_completed = "";
    data.forEach(item => {
        // console.log(item.status);
        // console.log(typeof item.status);
        if (item.status == "todo") {
            content_todo += `
                <li>
                    <span>${item.textTask}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteTask(${item.id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="edit" onclick="getTask(${item.id})">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button class="complete" onclick="changeState(${item.id}, '${item.textTask}', '${item.status}')">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                      </button>
                    </div>
                </li>
                `;
            // console.log(content);
            getEleID("todo").innerHTML = content_todo;
        }
        if (item.status == "completed") {
            content_completed += `
                    <li>
                    <span>${item.textTask}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteTask(${item.id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="edit" onclick="getTask(${item.id}, '${item.status}')">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button class="complete" onclick="changeState(${item.id}, '${item.textTask}', '${item.status}')">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                      </button>
                    </div>
                </li>
                `;
            // console.log(content);
            getEleID("completed").innerHTML = content_completed;
        }
    })

}

const deleteTask = (id) => {
    service.deleteTaskApi(id)
        .then((result) => {
            // console.log(result);
            fetchData();
            alert("Delete success!");
            
        })
        .catch((error) => {
            alert(error);
        })
}
window.deleteTask = deleteTask;

const addTask = () => {
    const textTask = getEleID("newTask").value;
    
    let isValid = true;

    isValid &= validation.checkEmpty(textTask, "Task is required!", "announce")

    if(isValid){
        const taskObj = new Task("", textTask, "todo");
        // console.log(taskObj);
    
        service.addTaskApi(taskObj)
            .then((result) => {
                // console.log(result);
                fetchData();
                alert("Add success!");
                location.reload();
            })
            .catch((error) => {
                alert(error);
            });
    }
}
window.addTask = addTask;

const getTask = (id, status) => {
    const buttonUpdate =`
        <input
              id="newTask"
              type="text"
              placeholder="Enter an activity..."
        />
        <button class="update" onclick="updateTask(${id},'${status}')">
            <i class="fa fa-check"></i>
        </button>
    `;
    getEleClass("card__add")[0].innerHTML = buttonUpdate;
    service.getTaskById(id)
        .then((result) => {
            // console.log(result);
            getEleID("newTask").value = result.data.textTask;
         
        })
        .catch((error) => {
            alert(error);
        })
}
window.getTask = getTask;

const updateTask = (id, status) => {
    const textTask = getEleID("newTask").value;

    const taskObj = new Task("", textTask, status);
    // console.log(taskObj);

    service.updateTaskById(id, taskObj)
        .then((result) => {
            // console.log(result);
            fetchData();
            alert("Update success!");   
            location.reload();
        })
        .catch((error) => {
            alert(error);
        });
}
window.updateTask = updateTask;

const changeState = async (id, textTask, status) => {
    const taskObj = new Task(id, textTask, status);
    // console.log(taskObj);
    const taskDetail = await service.getTaskById(id);
    
    if (taskDetail.data.status == "todo"){
        taskObj.status = "completed";   
    }
    if (taskDetail.data.status == "completed"){
        taskObj.status = "todo";
    }
    // console.log(taskObj);

    const result = await service.updateTaskById(id, taskObj);
    if(result.status == 200){
        fetchData();
    }
}
window.changeState = changeState;
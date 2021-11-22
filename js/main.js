import Task from "./Task.js";
import TaskService from "./TaskService.js";

const service = new TaskService();

const getEleID = (id) => (document.getElementById(id));
const getEleClass = (className) => (document.getElementsByClassName(className));

const fetchData = () => {
    service.getListTaskApi()
        .then((result) => {
            // console.log(result);
            renderData(result.data);
            // if(result.data.status == "todo"){
            //     renderDataToDo(result.data);
            // }
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
                        <button class="remove">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete">
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
                        <button class="remove">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete">
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

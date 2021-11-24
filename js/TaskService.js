export default class TaskService{
    getListTaskApi = () => {
        return axios({
            url: "https://6183cae591d76c00172d1b53.mockapi.io/api/task",
            method: "GET",
        });
    };

    deleteTaskApi = (id) => {
        return axios({
            url: `https://6183cae591d76c00172d1b53.mockapi.io/api/task/${id}`,
            method: "DELETE",
        });
    };

    addTaskApi = (taskObj) => {
        return axios({
            url: "https://6183cae591d76c00172d1b53.mockapi.io/api/task",
            method: "POST",
            data: taskObj,
        });
    };

    getTaskById = (id) => {
        return axios({
            url: `https://6183cae591d76c00172d1b53.mockapi.io/api/task/${id}`,
            method: "GET",
        });
    };

    updateTaskById = (id, taskObj) => {
        return axios({
            url: `https://6183cae591d76c00172d1b53.mockapi.io/api/task/${id}`,
            method: "PUT",
            data: taskObj,
        });
    };
}
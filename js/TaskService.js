export default class TaskService{
    getListTaskApi = () => {
        return axios({
            url: "https://6183cae591d76c00172d1b53.mockapi.io/api/task",
            method: "GET",
        });
    };
}
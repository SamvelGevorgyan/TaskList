import axios from "axios";
import spinnerLoading from '../spinner/spinner';
import {taskList} from '../getData/getData';

export const sortData = sortType => dispatch => {
    const {page, filterBy, order} = sortType;

    dispatch(spinnerLoading(true));
    return new Promise(
        (resolve, reject) => {
            axios.get(`https://uxcandy.com/~shapoval/test-task-backend/?developer=Samvel`, {
                params: {
                    page,
                    sort_field: filterBy,
                    sort_direction: order
                }
            })
                .then(res => {
                    const {tasks, total_task_count} = res.data.message;

                    dispatch(taskList(tasks, total_task_count, filterBy, order, page));
                    dispatch(spinnerLoading(false));
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
};
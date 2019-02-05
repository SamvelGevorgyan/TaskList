import axios from 'axios';
import {GET_DATA} from '../actionTypes/actionTypes';
import spinnerLoading from '../spinner/spinner';

export const taskList = (taskList, total_task_count, sort_field, sort_direction, page) => {
    return {
        type: GET_DATA,
        taskList,
        total_task_count,
        sort_field,
        sort_direction,
        page
    }
};

export const getData = params => dispatch => {
    const {page, filterBy, order} = params;

    dispatch(spinnerLoading(true));
    axios.get('https://uxcandy.com/~shapoval/test-task-backend/?developer=Samvel', {
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
        });
};
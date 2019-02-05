import {GET_DATA, EDIT_DATA} from '../../actions/actionTypes/actionTypes';

const initialState = {
    taskList: [],
    total_task_count: 0,
    page: 1,
    sort_field: "id",
    sort_direction: "asc"
};

const taskList = (state = initialState, action) => {
    const {type, taskList, total_task_count, sort_direction, sort_field, page} = action;
    switch (type) {
        case GET_DATA:
            return {
                ...state,
                total_task_count: Number(total_task_count),
                taskList,
                sort_field,
                sort_direction,
                page
            };
        case EDIT_DATA:
            const temp = {...state};
            temp.taskList = temp.taskList.map(currentTask => {
                if (currentTask.id === action.id) {
                    return {...currentTask, ...action.data};
                }
                return currentTask;
            });
            return temp;
        default:
            return state;
    }
};

export default taskList;
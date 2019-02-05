import {combineReducers} from 'redux';
import taskList from '../taskList/taskList';
import spinner from '../spinner/spinner';

export default combineReducers({
    taskList,
    spinner
});
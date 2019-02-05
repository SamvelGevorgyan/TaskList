import {SPINNER} from '../actionTypes/actionTypes';

const spinnerLoading = (status) => {
    return {
        type: SPINNER,
        show: status
    }
};

export default spinnerLoading;

 
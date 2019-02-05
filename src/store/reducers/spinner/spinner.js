import {SPINNER} from '../../actions/actionTypes/actionTypes';

const initialState = {
    spinner: true
};

const spinner = (state = initialState, action) => {
    const {type, show} = action;
    switch (type) {
        case SPINNER:
            return {
                ...state,
                spinner: show
            };
        default:
            return state
    }
};

export default spinner;
import axios from "axios";
import spinnerLoading from '../spinner/spinner';

export const addData = info => dispatch => {
    const {username, email, text, image_path} = info;
    let formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('text', text);
    formData.append("image", image_path);

    dispatch(spinnerLoading(true));
    return new Promise(
        (resolve, reject) => {
            axios({
                method: 'post',
                url: 'https://uxcandy.com/~shapoval/test-task-backend/create?developer=Samvel',
                data: formData,
            }).then(response => {
                resolve();
            })
                .catch(error => {
                    reject(error);
                });
        });
};
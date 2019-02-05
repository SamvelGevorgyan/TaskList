import axios from "axios";
import md5 from "../../../utils/md5";
import rfc3986 from "../../../utils/rfc3986";
import {EDIT_DATA} from '../actionTypes/actionTypes';

export const editData = (unorderedData, id) => dispatch => {

    let formData = new FormData();
    let orderedData = {};
    let encodedObject = {};
    let encodedString = "";

    Object.keys(unorderedData).sort().forEach(function (key) {
        orderedData[key] = unorderedData[key];
    });
    orderedData.token = 'beejee';

    for (const prop in orderedData) {
        encodedObject[rfc3986(prop)] = rfc3986(orderedData[prop]);
    }

    for (const prop in encodedObject) {
        if (encodedString !== "") {
            encodedString += "&";
        }
        encodedString += `${prop}=${encodedObject[prop]}`
    }

    encodedString = md5(encodedString);
    orderedData.signature = encodedString;

    for (const prop in orderedData) {
        formData.append(prop, orderedData[prop]);
    }

    return new Promise(
        (resolve, reject) => {
            axios({
                method: 'post',
                url: `https://uxcandy.com/~shapoval/test-task-backend/edit/${id}?developer=Samvel`,
                data: formData,
            })
                .then(res => {
                    res && dispatch({
                        type: EDIT_DATA,
                        data: unorderedData,
                        id: id
                    });
                    resolve();
                }).catch(error => {
                reject(error);
            });
        });
};
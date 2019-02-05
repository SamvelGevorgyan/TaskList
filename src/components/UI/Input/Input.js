import React from 'react';
import './Input.css'

const Input = ({
                   inputType, value, change, click, name, placeholder, isText, isFile,
                   isEmail,
                   isTextArea,
                   addTask,
                   adminName, adminPass, isFilterBy, isOrder, isStatusType, filterBtn
               }) => {
    let isValidMail = false;
    let isValidUserName = false;
    let isValidTask = false;
    let inputElement = null;

    switch (inputType) {
        case ('select'):
            if (isFilterBy) {
                inputElement = (
                    <select className="filterInput" name="filterBy" value={value} onChange={change}>
                        <option value="id">Id</option>
                        <option value="username">Username</option>
                        <option value="email">Email</option>
                        <option value="status">Status</option>
                    </select>
                );
            } else if (isOrder) {
                inputElement = (
                    <select className="filterInput" name="order" value={value} onChange={change}>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                );
            } else if (isStatusType) {
                inputElement = (
                    <select className="filterInput" name="isDone" value={value} onChange={change}>
                        <option value="10">Done</option>
                        <option value="0">In Progress</option>
                    </select>
                );
            }
            break;
        case ('button'):
            if (addTask) {
                inputElement = (
                    <button
                        className={!(isValidMail && isValidUserName && isValidTask) ? "unValidButton" : "validButton"}
                        disabled={!(isValidMail && isValidUserName && isValidTask)} onClick={click}>{name}</button>
                );
            }

            inputElement = (
                <button className={filterBtn ? "filterButton" : "validButton"} onClick={click}>{name}</button>
            );
            break;
        case ('inputByType'):
            if (isText) {
                isValidUserName = value.length > 3;
                inputElement = (
                    <input placeholder={placeholder} name={name} type="text" value={value} onChange={change}
                           className={value.length > 0 ? isValidUserName ? 'inputValid' : 'inputUnvalid' : 'Input'}/>
                );
            } else if (isEmail) {
                const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let isValid = reg.test(value.toLowerCase());
                isValidMail = isValid;
                inputElement = (
                    <input placeholder={placeholder} name={name} type="text" value={value} onChange={change}
                           className={value.length > 0 ? isValidMail ? 'inputValid' : 'inputUnvalid' : 'Input'}/>
                );
            } else if (isTextArea) {
                isValidTask = value.length >= 10;
                inputElement = (
                    <textarea placeholder={placeholder} name={name} value={value} onChange={change}
                              className={value.length > 0 ? isValidTask ? 'inputValid' : 'inputUnvalid' : 'Input'}/>
                );
            } else if (isFile) {
                inputElement = (
                    <label className="upload">
                        <input type="file" value={value} onChange={change} accept="image/x-png,image/gif,image/jpeg"/>
                    </label>
                );
            } else if (adminPass) {
                inputElement = (
                    <input className="'Input" placeholder={placeholder} name={name} type="password" value={value}
                           onChange={change}/>
                );
            } else if (adminName) {
                isValidUserName = value.length > 3;
                inputElement = (
                    <input className="'Input" placeholder={placeholder} name={name} type="text" value={value}
                           onChange={change}/>
                );
            }
            break;
        default:
            inputElement = null
    }
    return (
        <div>
            {inputElement}
        </div>
    )
};

export default Input;
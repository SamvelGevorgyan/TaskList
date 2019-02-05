import React, {Component} from 'react';
import {connect} from "react-redux";
import {addData} from '../../store/actions/addData/addData';
import {getData} from '../../store/actions/getData/getData';
import {bindActionCreators} from "redux";
import Input from '../UI/Input/Input';
import Error from "../UI/Error/Error";
import imageChangeSize from "../../utils/imageChangeSize";
import dataURLtoBlob from "../../utils/dataToURL";
import './AddTask.css';

class AddTask extends Component {
    state = {
        username: '',
        email: '',
        text: '',
        image_path: "",
        isError: false,
        errorMessage: ""
    };

    inputChangeHandler = event => {
        const {files, name, value} = event.target;

        if (files) {
            imageChangeSize(files[0], 256, 240).then(res => {
                const image_path = dataURLtoBlob(res);
                this.setState({image_path});
            });
        }

        this.setState({
            [name]: value
        });
    };

    addDataHandler = (event, info) => {
        event.preventDefault();
        const {addData, getData, taskList, countTasks, sort_field, sort_direction, page} = this.props;

        addData(info).then(res => {
            this.setState({
                username: '',
                email: '',
                text: '',
                errorMessage: "",
                isError: false
            });
        }).catch(err => {
            this.setState({
                isError: true,
                errorMessage: err
            });
        });
        getData({taskList, countTasks, sort_field, sort_direction, page});
    };

    render() {
        const {username, email, text, image_path, isError, errorMessage} = this.state;

        return (
            <div className="AddTaskContainer">
                <Input name="username"
                       placeholder="User Name"
                       inputType="inputByType"
                       isText
                       value={username}
                       change={this.inputChangeHandler}/>

                <Input name="email"
                       placeholder="Email"
                       inputType="inputByType"
                       isEmail
                       value={email}
                       change={this.inputChangeHandler}/>

                <Input name="text"
                       placeholder="Task must be at least 10 characters long"
                       inputType="inputByType"
                       isTextArea
                       value={text}
                       change={this.inputChangeHandler}/>

                <Input inputType="inputByType"
                       isFile
                       change={this.inputChangeHandler}/>

                {isError && <Error message={errorMessage}/>}
                <Input inputType="button"
                       addTask
                       name="Add Task"
                       value={image_path}
                       click={(event) => this.addDataHandler(event, {username, email, text, image_path})}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        spinner: state.spinner.spinner,
        sort_field: state.taskList.sort_field,
        sort_direction: state.taskList.sort_direction,
        page: state.taskList.page,
        countTasks: state.taskList.total_task_count,
        taskList: state.taskList.taskList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addData: bindActionCreators(addData, dispatch),
        getData: bindActionCreators(getData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
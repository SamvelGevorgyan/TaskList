import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {editData} from "../../store/actions/editData/editData";
import Aux from '../../hoc/AuxWin/AuxWin';
import Input from '../UI/Input/Input';
import Error from "../UI/Error/Error";
import './TaskBody.css';

class TaskBody extends Component {
    state = {
        isAdmin: localStorage.getItem('isAdmin') === '1',
        edit: false,
        taskText: this.props.text,
        isDone: this.props.status,
        isError: false,
        errorMessage: ""
    };

    editTaskHandler = () => {
        this.setState({
            edit: true
        })
    };

    saveHandler = () => {
        const {taskText, isDone} = this.state;
        const {id, editData} = this.props;

        editData({
            text: taskText,
            status: isDone
        }, id).then(res => {
            this.setState({
                edit: false,
                isError: false,
                errorMessage: ""
            })
        }).catch(err => {
            this.setState({
                isError: true,
                errorMessage: err
            })
        })
    };

    taskChangeHandler = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {username, email, text, status: station, img} = this.props;
        const {isAdmin, isDone, taskText, edit, isError, errorMessage} = this.state;
        const status = Number(station);

        let content = (
            <Aux>
                <div className="TaskItem">
                    <span className="Title">User Name</span>
                    <span className="Result">{username}</span>
                </div>
                <div className="TaskItem">
                    <span className="Title">User Email </span>
                    <span className="Result">{email}</span>
                </div>
                <div className="TaskItem">
                    <span className="Title">User Task</span>
                    <span className="Result">{text}</span>
                    <span className={status ? "Done" : "InProgress"}>{status ? 'Done' : 'in Progress'}</span>
                    {
                        isAdmin && <div>
                            <Input inputType="button"
                                   name="Edit Task"
                                   click={this.editTaskHandler}/>
                        </div>
                    }
                </div>
            </Aux>
        );

        if (edit) {
            content = (
                <div className="Editable">
                    <Input inputType="inputByType"
                           isTextArea
                           value={taskText}
                           change={this.taskChangeHandler}
                           name='taskText'/>

                    <Input inputType="select"
                           isStatusType
                           value={isDone}
                           change={this.taskChangeHandler}/>

                    {isError && <Error message={errorMessage}/>}

                    <Input inputType="button"
                           name="Save"
                           click={this.saveHandler}/>
                </div>
            );
        }

        return (
            <div className="TaskBodyContainer">
                {content}
                <div className="TaskItem">
                    <img src={img} alt="userImage"/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editData: bindActionCreators(editData, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(TaskBody);
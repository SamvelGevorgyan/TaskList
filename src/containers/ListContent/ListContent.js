import React from 'react';
import {connect} from "react-redux";
import TaskBody from '../../components/TaskBody/TaskBody';
import Aux from '../../hoc/AuxWin/AuxWin';

const ListContent = ({spinner, taskList}) => {
    let taskBody = spinner ? null : taskList.map(task => (
        <TaskBody
            key={task.id}
            id={task.id}
            username={task.username}
            img={task.image_path}
            email={task.email}
            text={task.text}
            status={task.status}
        />
    ));

    return (
        <Aux>
            {taskBody}
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        taskList: state.taskList.taskList,
        spinner: state.spinner.spinner
    }
};

export default connect(mapStateToProps)(ListContent);
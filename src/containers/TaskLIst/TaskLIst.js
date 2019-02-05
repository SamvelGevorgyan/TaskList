import React, {Component} from 'react';
import {connect} from "react-redux";
import {getData} from '../../store/actions/getData/getData';
import {bindActionCreators} from "redux";
import Spinner from '../../components/UI/Spinner/Spinner';
import Sort from '../../components/Sort/Sort'
import ListContent from '../ListContent/ListContent';
import PagePagination from "../../components/UI/PagePagination/PagePagination";
import "./TaskList.css";

class TaskList extends Component {
    state = {
        page: 1
    };

    componentDidMount() {
        const {sort_field, sort_direction, getData, taskList, countTasks} = this.props;
        const {page} = this.state;

        getData({
            taskList,
            total_task_count: countTasks,
            filterBy: sort_field,
            order: sort_direction,
            page
        });
        localStorage.getItem('isAdmin');
    }

    setPageHandler = page => {
        this.setState({
            page
        })
    };

    render() {
        const {spinner, countTasks, getData, sort_direction, sort_field} = this.props;
        let taskBody = spinner ? <Spinner/> : <ListContent/>;

        return (
            <div>
                <Sort/>
                <div className={spinner ? "loader-area" : ""}>
                    {taskBody}
                </div>
                <PagePagination totalTasks={Math.ceil(countTasks / 3)}
                                getData={getData}
                                sort_field={sort_field}
                                sort_direction={sort_direction}
                                setPage={this.setPageHandler}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        spinner: state.spinner.spinner,
        taskList: state.taskList.taskList,
        countTasks: state.taskList.total_task_count,
        sort_field: state.taskList.sort_field,
        sort_direction: state.taskList.sort_direction
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getData: bindActionCreators(getData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {sortData} from '../../store/actions/sortData/sortData';
import Input from '../UI/Input/Input';
import Error from "../UI/Error/Error";
import './Sort.css';

class Sort extends Component {
    state = {
        filterBy: 'id',
        order: 'asc',
        isError: false,
        errorMessage: ""
    };

    filterChangeHandler = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    sortHandler = sortType => {
        const {sortData} = this.props;

        sortData(sortType).then(res => {
            this.setState({
                isError: false,
                errorMessage: ""
            });
        }).catch(err => {
            this.setState({
                isError: true,
                errorMessage: err
            });
        });
    };

    render() {
        const {filterBy, order, isError, errorMessage} = this.state;
        const {page} = this.props;

        return (
            <div className="SortContainer">
                <Input inputType="select"
                       isFilterBy
                       value={filterBy}
                       change={this.filterChangeHandler}/>

                <Input inputType="select"
                       isOrder
                       value={order}
                       change={this.filterChangeHandler}/>

                <Input inputType="button"
                       filterBtn
                       name="Filter"
                       click={() => this.sortHandler({filterBy, order, page})}/>

                {isError && <Error message={errorMessage}/>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        spinner: state.spinner.spinner,
        page: state.taskList.page,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sortData: bindActionCreators(sortData, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
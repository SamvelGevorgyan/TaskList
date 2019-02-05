import React, {Component} from 'react';
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import "./PagePagination.css";

class PagePagination extends Component {
    state = {
        currentPage: 1
    };

    changeCurrentPage = numPage => {
        const {getData, sort_direction, sort_field, setPage} = this.props;
        const params = {
            page: numPage,
            filterBy: sort_field,
            order: sort_direction
        };

        this.setState({currentPage: numPage});
        setPage(numPage);
        getData(params);
    };

    render() {
        const {currentPage} = this.state;
        const {totalTasks} = this.props;

        return (
            <Pagination
                currentPage={currentPage}
                totalPages={totalTasks}
                changeCurrentPage={this.changeCurrentPage}
                theme="square-fill"
            />
        );
    }
}

export default PagePagination;
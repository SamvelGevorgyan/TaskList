import React, {Component} from 'react';
import Input from '../UI/Input/Input';
import Error from "../UI/Error/Error";

class Login extends Component {
    state = {
        adminName: '',
        adminPass: '',
        isAdmin: 0,
        isError: false,
        errorMessage: ""
    };

    inputChangeHandler = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    onLoginHandler = () => {
        if (this.state.adminName === 'admin' && this.state.adminPass === '123') {
            localStorage.setItem('isAdmin', 1);
            this.setState({
                isError: false,
                errorMessage: "",
                isAdmin: localStorage.getItem('isAdmin')
            });
        } else {
            this.setState({
                isError: true,
                errorMessage: "You have entered an invalid username or password"
            });
        }
    };

    onLogoutHandler = () => {
        localStorage.setItem('isAdmin', 0);
        this.setState({
            isAdmin: localStorage.getItem('isAdmin'),
            adminName: '',
            adminPass: ''
        })
    };

    render() {
        const {isAdmin} = localStorage;
        const {adminName, adminPass, isError, errorMessage} = this.state;

        if (isAdmin === '1') {
            return (
                <div className="AddTaskContainer">
                    <Input click={this.onLogoutHandler}
                           inputType="button"
                           name="Logout"/>
                </div>
            );
        }

        return (
            <div className="AddTaskContainer">
                <Input placeholder="Admin Name"
                       name="adminName"
                       inputType="inputByType"
                       adminName
                       value={adminName}
                       change={(event) => this.inputChangeHandler(event)}/>

                <Input placeholder="Admin Password"
                       name="adminPass"
                       inputType="inputByType"
                       adminPass
                       value={adminPass}
                       change={(event) => this.inputChangeHandler(event)}/>
                {isError && <Error message={errorMessage}/>}
                <Input click={this.onLoginHandler}
                       inputType="button"
                       name="Login"/>
            </div>
        )
    }
}

export default Login;
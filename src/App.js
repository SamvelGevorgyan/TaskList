import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TaskList from './containers/TaskLIst/TaskLIst';
import AddTask from './components/AddTask/AddTask';
import Login from './components/Login/Login';
import Navigation from './components/UI/Navigation/Navigation';
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navigation/>
                    <Route path="/" exact component={TaskList}/>
                    <Switch>
                        <Route path="/addTask" component={AddTask}/>
                        <Route path="/login" component={Login}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
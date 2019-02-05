import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navigation.css'

const Navigation = () => (
    <div className="Navigation">
        <NavLink activeClassName="active" exact to='/'>Tasks</NavLink>
        <NavLink activeClassName="active" to='/addTask'>Add Task</NavLink>
        <NavLink activeClassName="active" to='/login'>Authorization</NavLink>
    </div>
);

export default Navigation;
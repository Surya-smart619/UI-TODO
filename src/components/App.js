import React, { Component } from 'react';
import Header from './header/header.js';
import SideMenu from './sidePanel/sidePanel.js';
import TaskComponent from './taskDetail/taskDetail.js';
import uuid from "uuid";
import './App.scss';

class App extends Component {
    state = { 
        activeList: {id: uuid(), name: "Tasks", tasks: []}
    }

    render() { 
        return (
            <div>
                <Header/>
                <div className = "container">
                    <SideMenu setActiveList = {this.setActiveList}/>
                    <TaskComponent activeList = {this.state.activeList} setActiveList = {this.setActiveList}/>
                </div>
            </div>
        );
    }

    setActiveList =(list) => {
        this.setState( {
            activeList : list
        })
    }

}

export default App;

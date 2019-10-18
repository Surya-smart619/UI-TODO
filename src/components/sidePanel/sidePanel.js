import React, { Component } from 'react';
import uuid from "uuid";

import './sidePanel.scss';

export class List {
    id;
    name;
    tasks;
}

class SideMenu extends Component {
    state = {
        list: List,
        todos: [],
        isSideMenuOpened: true,
        activeList: null,
    }
    render() {
        let listInput = React.createRef(); 
        function createListByName(event) {
            if('Enter' === event.key &&  '' !== listInput.current.value) {
                let list = new List();
                list.id = uuid();
                list.name = listInput.current.value;
                list.tasks = [];
                listInput.current.value = '';
                this.setState({todos: [...this.state.todos, list]});
            }
        }

        return (
            <div className = "leftPanel">  
                <div className = "leftPanelMenu">
                    <button id = "sideBarButton" onClick = {this.sidePanelToggleOperation}>
                        <i className = "fa fa-bars"></i>
                    </button>
                </div>
                <div className = {this.state.isSideMenuOpened ? 'leftPanelContainer' : 'closeLeftPanelContainer'}>
                    <div className = "leftPanelContent">
                        <i className = "fa fa-sun-o"></i>
                        <div className = {this.state.isSideMenuOpened ? 'leftPanelTitle' : 'displayNone'}>
                            <span>My Day</span>
                        </div>
                    </div>
                    <div className = "leftPanelContent">
                        <i className = "fa fa-star"></i>
                        <div className = {this.state.isSideMenuOpened ? 'leftPanelTitle' : 'displayNone'}>
                            <span>Important</span>
                        </div>
                    </div>
                    <div className = "leftPanelContent">
                        <i className = "fa fa-calendar"></i>
                        <div className = {this.state.isSideMenuOpened ? 'leftPanelTitle' : 'displayNone'}>
                            <span>Planned</span>
                        </div>
                    </div>
                    <div className = "leftPanelContent">
                        <i className = "fa fa-user"></i>
                        <div className = {this.state.isSideMenuOpened ? 'leftPanelTitle' : 'displayNone'}>
                            <span>Assigned to Me</span>
                        </div>
                    </div>
                    <div className = "leftPanelContent">
                        <i className = "fa fa-home"></i>
                        <div className = {"list" + this.state.isSideMenuOpened ? 'leftPanelTitle' : 'displayNone'}>
                            <span>Tasks</span>
                        </div>
                    </div>
                    {this.renderSideList()}
                </div>
                <div className = "leftPanelContent listInput">
                    <label onClick = {this.openSideMenu}><i className = "fa fa-plus"></i>
                        <input className = {this.state.isSideMenuOpened ? '' : 'displayNone'}
                            id = "listInput" type = "text" placeholder = "New list" ref = {listInput}
                                onKeyPress = {createListByName.bind(this)}/>
                    </label>
                </div>
            </div>
        );
    }

    sidePanelToggleOperation = () => {
        this.setState({
            isSideMenuOpened : !this.state.isSideMenuOpened
        });
    }

    openSideMenu = () => {
        this.setState({
            isSideMenuOpened : true
        });
    }

    renderSideList = () => {
        return (
            <div id = "sideList">
            {
                this.state.todos.map((list) => {
                return (
                    <div className = "leftPanelContent" onClick = {() => this.activateList(list)}>
                        <i className = "fa fa-list"></i>
                        <div className = {"list" + this.state.isSideMenuOpened ? 'leftPanelTitle' : 'displayNone'}>
                            <span>{list.name}</span>
                        </div>
                    </div>
                );
                })
            }
            </div>
        );
    }
    
    activateList = (list) => {
        this.props.setActiveList(list);
        console.log();
    }
}


export default SideMenu;
import React, { Component } from 'react';
import './taskDetail.scss';

class TaskComponent extends Component {
    state = { 
        activeList : this.props.activeList
     }
    render() { 
        return ( 
            <div className = "toDoList">
                <div className = "taskHeaderContainer">
                    <div className = "taskHeader">
                        <h2>
                            <input className = "listTitle" type = "text" onKeyPress = {this.setActiveList} onChange = {this.handleChange} value = {this.props.activeList.name}/>
                        </h2>
                    </div> 
                </div>
            </div>
        );
    }

    handleChange = (event) => {
        this.props.activeList.name = event.target.value;
        this.setState({
            activeList: this.props.activeList
        })
    }

    setActiveList = (event) => {
        if('Enter' === event.key) {
            this.props.setActiveList(this.props.activeList);
        }
    }
}

export default TaskComponent;
import React, { Component } from 'react';
import './header.scss';

class Header extends Component {
    state = {  }
    render() { 
        return (
            <div className = "header">
                <div className = "appName">
                    <span>To-Do</span>
                </div>
            </div>
        );
    }
}
 
export default Header;
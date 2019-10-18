import React, { Component } from 'react';
import Header from './header/header.js';
import SideMenu from './sidePanel/sidePanel.js';
import './App.scss';

class App extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Header/>
                <SideMenu/>
            </div>
        );
    }
}

export default App;

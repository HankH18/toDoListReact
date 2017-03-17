import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import MainView from './views/mainView'


const app = function() {
  ReactDOM.render(<MainView/>, document.querySelector('.container'))
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
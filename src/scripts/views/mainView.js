import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'


var MainView = React.createClass({
	componentWillMount: function() {
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	getInitialState: function() {
		return STORE.data
	},
	keyDownHandler: function(eventObj) {
		if (eventObj.keyCode === 13) {
			var input = eventObj.target.value
			ACTIONS.addListItem(input)
			eventObj.target.value = ''
		}
	},
	handleCheck: function(eventObj, i) {
		if (this.state.taskArray[i].toggle === 'on') {
			ACTIONS.itemUnchecked(i)
		} else {
			ACTIONS.itemChecked(i)
		}
	},
	changeView: function(newView) {
		if (newView != this.state.currentView) {
			ACTIONS.viewChanged(newView)
		}
	},
	makeItem: function(singleItem, i) {
		var displayProp
		if((this.state.taskArray[i].toggle === 'on' && this.state.currentView === 'complete') 
		|| (this.state.taskArray[i].toggle === 'off' && this.state.currentView === 'incomplete')
		|| (this.state.currentView === 'all')) {
			displayProp = 'block'
		} else {
			displayProp = 'none'
		}
		return(
			<div 
			className='singleTask'
			style={{display: displayProp}}>
				<p>{singleItem.name}</p>
				<input 
				type='checkbox'
				onChange={(eventObj)=>{this.handleCheck(eventObj, i)}} 
				value={this.state.taskArray[i].toggle} />
			</div>
		)
	},
	render: function() {
		return(
			<div className='mainBody'>
				<ListInput 
				keyDownHandler={this.keyDownHandler} />
				<ViewMenu 
				currentView={this.state.currentView}
				changeView={this.changeView} />
				<ListDisplay 
				items={this.state.taskArray}  
				makeItem={this.makeItem}
				currentView={this.state.currentView} />
			</div>
		)
	}
})

var ListInput = React.createClass({
	render: function() {
		return(
			<div className='inputDiv'>
				<input type='text' placeholder='Add New List Items' 
				onKeyDown={this.props.keyDownHandler} />
			</div>
		)
	}
})

var ViewMenu = React.createClass({
	render: function() {
		return(
			<div className='buttonDiv'>
				<p className='viewButton allButton'
				onClick={()=>{this.props.changeView('all')}}>All Tasks</p>
				<p className='viewButton incompleteButton'
				onClick={()=>{this.props.changeView('incomplete')}}>Incomplete Tasks</p>
				<p className='viewButton completeButton'
				onClick={()=>{this.props.changeView('complete')}}>Complete Tasks</p>
			</div>
		)
	}
})


var ListDisplay = React.createClass({
	render: function() {	
		return( 
			<div className='taskList'>
				{this.props.items.map(this.props.makeItem)}
			</div>
		)
	}
})


export default MainView
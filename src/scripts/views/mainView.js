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
		if (this.state.finishedTaskObj[i]) {
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
		return(
			<div className='singleTask'>
				<p>{singleItem}</p>
				<input 
				type='checkbox' 
				onChange={(eventObj)=>{this.handleCheck(eventObj, i)}}
				value={this.state.finishedTaskObj[i]?'on':'off'} />
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
				unDoneItems={this.state.currentTaskObj} 
				doneItems={this.state.finishedTaskObj}
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
				<p className='viewButton incompleteButton'
				onClick={()=>{this.props.changeView('incomplete')}}>Incomplete Tasks</p>
				<p className='viewButton completeButton'
				onClick={()=>{this.props.changeView('complete')}}>Complete Tasks</p>
				<p className='viewButton allButton'
				onClick={()=>{this.props.changeView('all')}}>All Tasks</p>
			</div>
		)
	}
})

//creating map function for objects so I don't have to make a new list item method
//set up that way so I can have one master list array whose indecies coorespond to the keys
//of the two other list objects
Object.prototype.map = function(callback) {
	var returnArray = []
	for(var prop in this) {
		returnArray.push(callback(this.prop, prop))
	}
	return returnArray
}


var ListDisplay = React.createClass({
	render: function() {
		if (this.props.currentView === 'all') {
			return(
				<div className='taskList allList'>
					{this.props.items.map(this.props.makeItem)}
				</div>
			)
		} else if (this.props.currentView === 'complete') {
			return(
				<div className='taskList completeList'>
					{this.props.doneItems.map(this.props.makeItem)}
				</div>
			)
		} else {
			return(
				<div className='taskList incompleteList'>
					{this.props.unDoneItems.map(this.props.makeItem)}
				</div>
			)
		}
	}
})


export default MainView
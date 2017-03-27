import React from 'react'
import Backbone from 'backbone'
import STORE from '../store'
import ACTIONS from '../actions'


var MainView = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchAllChores()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	getInitialState: function() {
		return STORE.data
	},
	keyDownHandler: function(eventObj) {
		if (eventObj.keyCode === 13) {
			var input = {
				name: eventObj.target.value
			}
			ACTIONS.addChore(input)
			eventObj.target.value = ''
			console.log(this.state)
		}
	},
	handleCheck: function(eventObj, i) {
		if (this.state.choreCollection.models[i].attributes.status === 'on') {
			ACTIONS.itemUnchecked(this.state.choreCollection.models[i])
		} else {
			ACTIONS.itemChecked(this.state.choreCollection.models[i])
		}
	},
	changeView: function(newView) {
		if (newView != this.state.currentView) {
			ACTIONS.viewChanged(newView)
		}
	},
	makeItem: function(singleItem, i) {
		var displayProp
		var itemAttributes = this.state.choreCollection.models[i].attributes
		if((itemAttributes.status === 'on' && this.state.currentView === 'complete') 
		|| (itemAttributes.status === 'off' && this.state.currentView === 'incomplete')
		|| (this.state.currentView === 'all')) {
			displayProp = 'block'
		} else {
			displayProp = 'none'
		}
		return(
			<div 
			className='singleTask'
			style={{display: displayProp}}>
				<p className='taskText'>{singleItem.attributes.name}</p>
				<input
				className='checkBox' 
				type='checkbox'
				onChange={(eventObj)=>{this.handleCheck(eventObj, i)}} 
				value={itemAttributes.status} />
			</div>
		)
	},
	render: function() {
		return(
			<div className='mainBody'>
				<ViewMenu 
				currentView={this.state.currentView}
				changeView={this.changeView} />
				<ListDisplay 
				items={this.state.choreCollection.models}
				keyDownHandler={this.keyDownHandler}  
				makeItem={this.makeItem}
				currentView={this.state.currentView} />
			</div>
		)
	}
})

var ViewMenu = React.createClass({
	render: function() {
		var currentPage = this.props.currentView
		return(
			<div className='buttonDiv'>
				<p className='viewButton allButton'
				onClick={()=>{this.props.changeView('all')}}
				style={currentPage==='all'?{background: 'red'}:{background: 'gray'}}>
				All Tasks</p>
				<p className='viewButton incompleteButton'
				onClick={()=>{this.props.changeView('incomplete')}}
				style={currentPage==='incomplete'?{background: 'red'}:{background: 'gray'}}>
				Incomplete Tasks</p>
				<p className='viewButton completeButton'
				onClick={()=>{this.props.changeView('complete')}}
				style={currentPage==='complete'?{background: 'red'}:{background: 'gray'}}>
				Complete Tasks</p>
			</div>
		)
	}
})


var ListDisplay = React.createClass({
	render: function() {	
		return( 
			<div className='taskList'>
				<ListInput keyDownHandler={this.props.keyDownHandler} />
				{this.props.items.map(this.props.makeItem)}
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


export default MainView
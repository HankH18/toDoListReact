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
	render: function() {
		return(
			<div className='mainBody'>
				<ListInput />
				<ListDisplay items={STORE.data.taskArray}/>
			</div>
		)
	}
})

var ListInput = React.createClass({
	keyDownHandler: function(eventObj) {
		if (eventObj.keyCode === 13) {
			var input = eventObj.target.value
			ACTIONS.addListItem(input)
			eventObj.target.value = ''
		}
	},
	render: function() {
		return(
			<div className='inputDiv'>
				<input type='text' placeholder='Add New List Items' onKeyDown={this.keyDownHandler} />
			</div>
		)
	}
})

var ListDisplay = React.createClass({
	makeItem: function(singleItem) {
		console.log(singleItem)
		return(
			<div className='singleTask'>
				<p>{singleItem}</p>
			</div>
		)
	},
	render: function() {
		return(
			<div className='allTasks'>
				{this.props.items.map(this.makeItem)}
			</div>
		)
	}
})


export default MainView
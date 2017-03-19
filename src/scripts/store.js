import Backbone from 'backbone'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		taskArray: [],
		currentView: 'all'
	},
	set: function(str) {
		this.data.taskArray.push({name: str, toggle: 'off'})
		this.trigger('dataUpdated')
	},
	itemDone: function(index) {
		this.data.taskArray[index].toggle = 'on'
		this.trigger('dataUpdated')
	},
	itemUndone: function(index) {
		this.data.taskArray[index].toggle = 'off'
		this.trigger('dataUpdated')
	},
	changeView: function(newView) {
		this.data.currentView = newView
		this.trigger('dataUpdated')
	}
})


export default STORE
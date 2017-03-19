import Backbone from 'backbone'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		taskArray: [],
		currentTaskObj: {},
		finishedTaskObj: {},
		currentView: 'all'
	},
	set: function(str) {
		this.data.taskArray.push(str)
		this.data.currentTaskObj[(this.data.taskArray.length-1)] = str
		this.trigger('dataUpdated')
	},
	itemDone: function(index) {
		this.data.finishedTaskObj[index] = this.data.taskArray[index]
		delete this.data.currentTaskObj[index]
		this.trigger('dataUpdated')
	},
	itemUndone: function(index) {
		this.data.currentTaskObj[index] = this.data.taskArray[index]
		delete this.data.finishedTaskObj[index]
		this.trigger('dataUpdated')
	},
	changeView: function(newView) {
		this.data.currentView = newView
		this.trigger('dataUpdated')
	}
})


export default STORE
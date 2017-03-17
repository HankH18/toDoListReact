import Backbone from 'backbone'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		taskArray: [],
		currentTaskArray: [],
		finishedTaskArray: []
	},
	set: function(str) {
		this.data.taskArray.push(str)
		this.trigger('dataUpdated')
	}
})


export default STORE
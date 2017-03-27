import Backbone from 'backbone'
import {ChoreCollection} from './models/collections.js'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		choreCollection: new ChoreCollection(),
		currentView: 'all'
	},
	get: function(prop) {
		if (this.data[prop] === undefined) {
			throw new Error("The store doesn't have a property called " + prop)
		}
		return this.data[prop]
	},
	set: function(attrs) {
		this.data = Object.assign(this.data, attrs)
		this.trigger('dataUpdated')
	},
	changeView: function(newView) {
		this.data.currentView = newView
		this.trigger('dataUpdated')
	}
})


export default STORE
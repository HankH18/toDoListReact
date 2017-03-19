import Backbone from 'backbone'
import STORE from './store'

var ACTIONS = {
	addListItem: function(str) {
		STORE.set(str)
	},
	itemChecked: function(index) {
		STORE.itemDone(index)
	},
	itemUnchecked: function(index) {
		STORE.itemUndone(index)
	},
	viewChanged: function(newView) {
		STORE.changeView(newView)
	}
}

export default ACTIONS
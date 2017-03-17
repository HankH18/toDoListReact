import Backbone from 'backbone'
import STORE from './store'

var ACTIONS = {
	addListItem: function(str) {
		STORE.set(str)
	}
}

export default ACTIONS
import Backbone from 'backbone'
import STORE from './store'
import {ChoreModel} from './models/collections.js'

var ACTIONS = {
	addChore: function(choreData) {
		var newChore = new ChoreModel(choreData)
		newChore.save()
			.then(
				function(resp) {
					ACTIONS.fetchAllChores()
				},
				function(err) {
					alert('Problem saving your chore!')
					console.log(err)
				}
			)
	},
	itemChecked: function(model) {
		model.set({
			status: 'on'
		})
		model.save()
			.done(function(resp) {
				ACTIONS.fetchAllChores()
			})
			.fail(function(err) {
				alert("Problem changing chore status")
				console.log(err)
			})
	},
	itemUnchecked: function(model) {
		model.set({
			status: 'off'
		})
		model.save()
			.done(function(resp) {
				ACTIONS.fetchAllChores()
			})
			.fail(function(err) {
				alert("Problem changing chore status")
				console.log(err)
			})
	},
	deleteChore: function(model) {
		model.destroy()
			.done(function(resp) {
				console.log(resp)
				ACTIONS.fetchAllChores()
			})
			.fail(function(err) {
				alert("Problem deleting chore")
				console.log(err)
			})
	},
	viewChanged: function(newView) {
		STORE.changeView(newView)
	},
	fetchAllChores: function() {
		var choreColl = STORE.get('choreCollection')
		choreColl.fetch()
			.then(function() {
				STORE.set({
					choreCollection: choreColl
				})
			})
	}
}

export default ACTIONS
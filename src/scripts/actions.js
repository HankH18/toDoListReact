import Backbone from 'backbone'
import STORE from './store'
import {ChoreModel} from './models/collections.js'

var ACTIONS = {
	addChore: function(choreData) {
		var newChore = new ChoreModel(choreData)
		newChore.save()
			.then(
				function(response) {
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
			.done(ACTIONS.fetchAllChores())
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
	//addListItem: function(str) {
		//STORE.set(str)
	//},
	//itemChecked: function(index) {
		//STORE.itemDone(index)
	//},
	//itemUnchecked: function(index) {
		//STORE.itemUndone(index)
	//}

//action methods to change: addListItem->addChore itemChecked-> itemUnchecked-> viewChangex

export default ACTIONS
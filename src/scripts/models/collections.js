import Backbone from 'backbone'

export var ChoreModel = Backbone.Model.extend({
	urlRoot: '/url/myChores',
	idAttribute: '_id'
})

export var ChoreCollection = Backbone.Collection.extend({
	comparator: function(mod) {
		return new Date(mod.get('createdAt')).getTime() * -1
	},
	model: ChoreModel,
	url: '/url/myChores'
})
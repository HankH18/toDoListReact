import Backbone from 'backbone'

export const ChoreModel = Backbone.Model.extend({
	urlRoot: '/api/myChores',
	idAttribute: '_id'
})

export const ChoreCollection = Backbone.Collection.extend({
	model: ChoreModel,
	url: '/api/myChores'
})
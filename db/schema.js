const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

const choreSchema = new mongoose.Schema({
	name: {type: String, required: true},
	status: {type: String, default: 'off'},
	createdAt: {type: Date, default: Date.now()}
})

module.exports = {
  	User: mongoose.model('User', usersSchema),
  	Chore: mongoose.model('Chore', choreSchema)
}

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var questionSchema = new Schema({
	'title' : String,
	'description' : String,
	'postedBy' : {
		type: Schema.Types.ObjectId,
		ref: 'users'
   },
	'createdAt' : Date
});

module.exports = mongoose.model('question', questionSchema);

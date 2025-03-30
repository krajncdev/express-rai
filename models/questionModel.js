var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var answerSchema = new Schema({
	content: String,
	postedBy: { type: Schema.Types.ObjectId, ref: 'user' },
	createdAt: { type: Date, default: Date.now },
	isAccepted: { type: Boolean, default: false },
  });

var questionSchema = new Schema({
	'title' : String,
	'description' : String,
	'postedBy' : {
		type: Schema.Types.ObjectId,
		ref: 'user'
   },
	'createdAt' : Date,
	'answers': [answerSchema],
});

module.exports = mongoose.model('question', questionSchema);

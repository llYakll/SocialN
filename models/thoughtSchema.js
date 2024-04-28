const mongoose = require('mongoose');
const reactionSchema = require('./reactionSchema');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [reactionSchema] // Define reactions as an array of reactionSchema objects
}, {
  toJSON: { virtuals: true },
  id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

module.exports = mongoose.model('Thought', thoughtSchema);
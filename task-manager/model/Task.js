const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'], // a custom message when this attribute is missing
        trim: true, // trim the whitespaces at both ends
        maxlength: [20, 'name cannot be more than 20 characters'] // the maximum length of string
    },

    completed: {
        type: Boolean,
        default: false // default value of this attribute
    }
})

module.exports = mongoose.model('Task', TaskSchema);
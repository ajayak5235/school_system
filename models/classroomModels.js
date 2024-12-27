const mongoose = require('mongoose')

const classroomSchema = new mongoose.Schema({
    name:{type: String, require: true},
    capacity:{type: Number, require: true},
    school: {type: String, ref: 'School',require: true},
    resources: {type: String},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
})

module.exports = mongoose.model('Classroom', classroomSchema);

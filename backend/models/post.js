const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        min : 3,
        max : 80
    },
    content : {
        type : String,
        required : true
    },
    imagePath : {
        type : String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);
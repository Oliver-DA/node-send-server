const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linksSchema = new Schema({

    url: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    original_name: {
        type: String,
        required: true
    },

    downloads: {
        type: Number,
        default: 1
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        red: "User",
        default: null
    },

    password: {
        type: String
    },

    creadedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Link", linksSchema)
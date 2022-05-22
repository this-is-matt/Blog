const mongoose = require("mongoose")
const articleSchema = new mongoose.Schema({
    "title":  String,
    "copy": String
})

module.exports = mongoose.model("articles", articleSchema)
const mongoose = require("mongoose");
/*player schema */
let userSchema = {
    username: {type: String, default: ""},
    password: {type: String, default: ""},
};

var userModel = mongoose.model("user", userSchema);

module.exports = {
    userSchema:userSchema,
    userModel:userModel,
};
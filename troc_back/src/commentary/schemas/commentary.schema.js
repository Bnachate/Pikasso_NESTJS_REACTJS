"use strict";
exports.__esModule = true;
exports.CommentarySchema = void 0;
var mongoose = require("mongoose");
exports.CommentarySchema = new mongoose.Schema({
    commentary: String,
    user_id: String,
    user_name: String,
    product_id: String,
    created_at: { type: Date, "default": Date.now }
});

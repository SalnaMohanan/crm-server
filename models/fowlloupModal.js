const mongoose = require("mongoose");

const FollowupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },

    status: { type: String, required: true },
    notes: { type: String, required: true },
});

module.exports = mongoose.model("Followups", FollowupSchema);
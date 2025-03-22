const Followups = require('../models/fowlloupModal');

exports.addFollowupController = async(req, res) => {
    console.log("Inside addFollowupController");

    try {
        const { name, email, phone, date, status, notes } = req.body;

        const newFollowups = new Followups({
            name,
            email,
            phone,
            date,
            status,
            notes
        });

        await newFollowups.save();
        res.status(201).json(newFollowups);
    } catch (error) {
        console.error("Error adding followup:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
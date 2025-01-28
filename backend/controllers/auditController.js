const RenewalMahadbt = require("../models/mahadbtRenewalModel");

// ✅ Single Student Update Controller
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedData = req.body;
        const userId = req.user.id; // Get logged-in user ID

        await RenewalMahadbt.update(updatedData, {
            where: { id: studentId },
            individualHooks: true, // Triggers beforeUpdate hook
            userId, // Pass userId for tracking
        });

        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Bulk Update Students Controller
const bulkUpdateStudents = async (req, res) => {
    try {
        const { updates } = req.body; // `updates` is an array of { id, updatedData }
        const userId = req.user.id; // Get logged-in user ID

        for (const update of updates) {
            await RenewalMahadbt.update(update.updatedData, {
                where: { id: update.id },
                individualHooks: true, // Triggers beforeUpdate hook
                userId, // Pass userId for tracking
            });
        }

        res.status(200).json({ message: "Bulk update completed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { updateStudent, bulkUpdateStudents };

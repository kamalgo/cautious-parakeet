const forstu_candidates = require("../models/forstu_candidatesModel");

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to get all tranches
exports.getAllCandidates = (req, res) => {
    forstu_candidates
    .findAll({})
    .then((data) => {
        console.log('Data retrieved:', data);
        res.json({
            success: true,
            data,
        });
    })
    .catch((error) => {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve data from forstu_tranches",
            error: error.message || "An error occurred",
        });
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to get the count of all candidates
exports.getCandidatesCount = (req, res) => {
    forstu_candidates
        .count()
        .then((count) => {
            console.log('Count retrieved:', count);
            res.json({
                success: true,
                count,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Failed to count the data from forstu_candidates",
                error: error.message || "An error occurred",
            });
        });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to get the grand total of amount_receivable
exports.getTotalAmountReceivable = (req, res) => {
    forstu_candidates
        .sum('amount_receivable')
        .then((totalAmount) => {
            console.log('Total amount retrieved:', totalAmount);
            res.json({
                success: true,
                totalAmount,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Failed to retrieve the total amount from forstu_candidates",
                error: error.message || "An error occurred",
            });
        });
};
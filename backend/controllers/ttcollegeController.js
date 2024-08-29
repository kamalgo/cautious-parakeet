const { Sequelize } = require("sequelize");
const ForstuTranches = require("../models/forstu_tranchesModel");


// Function to get all tranches
exports.getTtcollegeTranches = async (req, res) => {
    try {
        // Fetch all data from the database
        const data = await ForstuTranches.findAll();

        // Respond with the data
        res.json({
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve data from forstu_tranches",
            error: error.message || "An error occurred",
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to update payment status
exports.updatePaymentStatus = async (req, res) => {
    const { paymentId } = req.params;
    const { status } = req.body;
    
    try {
        // Find payment by ID
        const payment = await ForstuTranches.findByPk(paymentId);
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: `Payment with id ${paymentId} not found`,
            });
        }
        
        // Update payment status
        payment.Status = status; // Assuming 'status' is the field in your model
        await payment.save();

        return res.json({
            success: true,
            message: `Payment ${paymentId} updated successfully`,
            data: payment,
        });
    } catch (error) {
        console.error("Error updating payment status:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update payment status.",
            error: error.message || "Unknown error",
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to get students by ApplicationID
exports.getStudentByApplicationId = (req, res) => {
    const applicationId = req.params.ApplicationID;
    console.log("Searching for ApplicationID:", applicationId);
    ForstuTranches
      .findAll({
        where: {
          ApplicationID: applicationId,
        },
      })
      .then((students) => {
        if (students.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No students found with the given ApplicationID",
          });
        }
  
        res.json({
          success: true,
          data: students,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve students by ApplicationID",
          error: error.message || "An error occurred",
        });
      });
};

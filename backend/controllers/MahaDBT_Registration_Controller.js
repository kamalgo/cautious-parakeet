const { Op } = require("sequelize");
const ROLES = require("../helpers/roles");

const MahaDBT_Registration = require("../models/MahaDBT_Registration");


const redisClient = require("../database/redisClient");

exports.mahadbt_Applicant_Name = async (req, res) => {
    try {
        const { applicantName } = req.body;

        if (!applicantName) {
            return res.status(400).json({
                success: false,
                message: "Applicant name is required.",
            });
        }

        // Store in Redis first
        const redisKey = `applicant:${applicantName}`;
        await redisClient.set(redisKey, JSON.stringify({ applicantName }));

        console.log("✅ Stored in Redis:", redisKey);

        // Now, store in MySQL RDS
        const newApplicant = await MahaDBT_Registration.create({
            mahadbt_Applicant_Name: applicantName
        });

        return res.status(201).json({
            success: true,
            message: "Applicant created successfully",
            data: {
                id: newApplicant.id,
                applicantName: newApplicant.mahadbt_Applicant_Name
            }
        });

    } catch (error) {
        console.error("❌ Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
};

// exports.mahadbt_Applicant_Name = async (req, res) => {
//     try {
//         const { applicantName } = req.body;

//         if (!applicantName) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Applicant name is required.',
//             });
//         }

//         // Create a new record in the MahaDBT_Registration table
//         const newApplicant = await MahaDBT_Registration.create({
//             mahadbt_Applicant_Name: applicantName // column name in the table
//         });

//         return res.status(201).json({
//             success: true,
//             message: 'Applicant created successfully',
//             data: {
//                 id: newApplicant.id, // Sending the ID in the response
//                 applicantName: newApplicant.mahadbt_Applicant_Name
//             }
//         });
//     } catch (error) {
//         console.error('Error creating applicant:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Server error.',
//         });
//     }
// };






exports.mahadbt_Username = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username is required.',
            });
        }

        const updatedApplicant = await MahaDBT_Registration.update(
            { Mahadbt_Username: username },
            { where: { id: req.body.id } }
        );

        return res.status(200).json({
            success: true,
            message: 'Username updated successfully',
            data: updatedApplicant
        });
    } catch (error) {
        console.error('Error updating username:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

// Mahadbt Password
exports.mahadbt_Password = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'Password is required.',
            });
        }

        const updatedApplicant = await MahaDBT_Registration.update(
            { mahadbt_password: password },
            { where: { id: req.body.id } }
        );

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
            data: updatedApplicant
        });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

// Mahadbt Applicant Email
exports.mahadbt_Applicant_Email = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required.',
            });
        }

        const updatedApplicant = await MahaDBT_Registration.update(
            { mahadbt_Applicant_Email: email },
            { where: { id: req.body.id } }
        );

        return res.status(200).json({
            success: true,
            message: 'Email updated successfully',
            data: updatedApplicant
        });
    } catch (error) {
        console.error('Error updating email:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

// Email OTP
exports.Email_OTP = async (req, res) => {
    try {
        const { otp } = req.body;

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: 'Email OTP is required.',
            });
        }

        const updatedApplicant = await MahaDBT_Registration.update(
            { Email_OTP: otp },
            { where: { id: req.body.id } }
        );

        return res.status(200).json({
            success: true,
            message: 'Email OTP updated successfully',
            data: updatedApplicant
        });
    } catch (error) {
        console.error('Error updating Email OTP:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

// Applicant Mobile
exports.mahadbt_Applicant_mobile = async (req, res) => {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({
                success: false,
                message: 'Mobile number is required.',
            });
        }

        const updatedApplicant = await MahaDBT_Registration.update(
            { mahadbt_Applicant_mobile: mobile },
            { where: { id: req.body.id } }
        );

        return res.status(200).json({
            success: true,
            message: 'Mobile number updated successfully',
            data: updatedApplicant
        });
    } catch (error) {
        console.error('Error updating mobile number:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

// Mobile OTP
exports.Mobile_OTP = async (req, res) => {
    try {
        const { otp } = req.body;

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: 'Mobile OTP is required.',
            });
        }

        const updatedApplicant = await MahaDBT_Registration.update(
            { Mobile_OTP: otp },
            { where: { id: req.body.id } }
        );

        return res.status(200).json({
            success: true,
            message: 'Mobile OTP updated successfully',
            data: updatedApplicant
        });
    } catch (error) {
        console.error('Error updating Mobile OTP:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

// Aadhaar Number
exports.Adhar_Number = async (req, res) => {
    try {
        const { aadhaar } = req.body;

        if (!aadhaar) {
            return res.status(400).json({
                success: false,
                message: 'Aadhaar number is required.',
            });
        }

        const updatedApplicant = await MahaDBT_Registration.update(
            { Adhar_Number: aadhaar },
            { where: { id: req.body.id } }
        );

        return res.status(200).json({
            success: true,
            message: 'Aadhaar number updated successfully',
            data: updatedApplicant
        });
    } catch (error) {
        console.error('Error updating Aadhaar number:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

// Aadhaar OTP
exports.Adhar_OTP = async (req, res) => {
    try {
        const { otp } = req.body;

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: 'Aadhaar OTP is required.',
            });
        }

        const updatedApplicant = await MahaDBT_Registration.update(
            { Adhar_OTP: otp },
            { where: { id: req.body.id } }
        );

        return res.status(200).json({
            success: true,
            message: 'Aadhaar OTP updated successfully',
            data: updatedApplicant
        });
    } catch (error) {
        console.error('Error updating Aadhaar OTP:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

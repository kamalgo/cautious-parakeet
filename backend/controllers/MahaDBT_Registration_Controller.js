const { Op } = require("sequelize");
const ROLES = require("../helpers/roles");

const MahaDBT_Registration = require("../models/MahaDBT_Registration");


const redisClient = require("../database/redisClient");
    

// exports.mahadbt_Applicant_Name = async (req, res) => {
//     try {
//         const { applicantName } = req.body;
//         console.log("🔹 Received request at /mahadbt-applicant");
//         console.log("🔹 Request body:", req.body);

//         if (!applicantName) {
//             console.log("❌ Missing applicantName");
//             return res.status(400).json({
//                 success: false,
//                 message: "Applicant name is required.",
//             });
//         }

//         // Store in Redis first
//         const redisKey = `mahadbt_Applicant_Name:${applicantName}`;
//         console.log(`🔹 Attempting to store in Redis: ${redisKey}`, JSON.stringify({ applicantName }));

//         await redisClient.set(redisKey, JSON.stringify({ applicantName }));
//         console.log("✅ Stored in Redis:", redisKey);

//         // Now, store in MySQL RDS
//         console.log("🔹 Attempting to store in MySQL");
//         const newApplicant = await MahaDBT_Registration.create({
//             mahadbt_Applicant_Name: applicantName
//         });

//         console.log("✅ Stored in MySQL:", newApplicant.id);

//         return res.status(201).json({
//             success: true,
//             message: "Applicant created successfully",
//             data: {
//                 id: newApplicant.id,
//                 applicantName: newApplicant.mahadbt_Applicant_Name
//             }
//         });

//     } catch (error) {
//         console.error("❌ Error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Server error.",
//         });
//     }
// };
exports.mahadbt_Applicant_Name = async (req, res) => {
    try {
        const { applicantName } = req.body;
        console.log("🔹 Received request at /mahadbt-applicant");
        console.log("🔹 Request body:", req.body);

        if (!applicantName) {
            console.log("❌ Missing applicantName");
            return res.status(400).json({
                success: false,
                message: "Applicant name is required.",
            });
        }

        // Store directly in MySQL (MySQL will generate the ID)
        console.log("🔹 Attempting to store in MySQL");
        const newApplicant = await MahaDBT_Registration.create({
            mahadbt_Applicant_Name: applicantName
        });

        console.log("✅ Stored in MySQL with ID:", newApplicant.id);

        // Use MySQL ID for Redis storage
        const mysqlId = newApplicant.id;
        const redisKey = `mahadbt_Applicant_Name:${mysqlId}`;
        const redisData = { id: mysqlId, applicantName };

        // Store in Redis
        await redisClient.set(redisKey, JSON.stringify(redisData));
        console.log("✅ Stored in Redis:", redisKey, redisData);

        return res.status(201).json({
            success: true,
            message: "Applicant created successfully",
            data: {
                id: mysqlId,
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
//         console.log("🔹 Received request at /mahadbt-applicant");
//         console.log("🔹 Request body:", req.body);

//         if (!applicantName) {
//             console.log("❌ Missing applicantName");
//             return res.status(400).json({
//                 success: false,
//                 message: "Applicant name is required.",
//             });
//         }

//         // Get the next Redis ID starting from 30
//         const redisId = await redisClient.incr("mahadbt_applicant_id");
//         console.log(`🔹 Generated Redis ID: ${redisId}`);

//         // Store in Redis first
//         const redisKey = `mahadbt_Applicant:${redisId}`;
//         const redisData = { id: redisId, applicantName };
//         await redisClient.set(redisKey, JSON.stringify(redisData));
//         console.log("✅ Stored in Redis:", redisKey, redisData);

//         // Now, store in MySQL RDS (MySQL will use its own auto-increment ID)
//         console.log("🔹 Attempting to store in MySQL");
//         const newApplicant = await MahaDBT_Registration.create({
//             mahadbt_Applicant_Name: applicantName
//         });

//         console.log("✅ Stored in MySQL with ID:", newApplicant.id);

//         return res.status(201).json({
//             success: true,
//             message: "Applicant created successfully",
//             data: {
//                 redisId: redisId,
//                 mysqlId: newApplicant.id,
//                 applicantName: newApplicant.mahadbt_Applicant_Name
//             }
//         });

//     } catch (error) {
//         console.error("❌ Error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Server error.",
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

        // Store updated username in Redis
        const redisKey = `Mahadbt_Username:${req.body.id}`; // Use applicant ID to form a unique Redis key
        const redisData = { id: req.body.id, username }; // Include ID and updated username
        await redisClient.set(redisKey, JSON.stringify(redisData));

        console.log("✅ Updated in Redis:", redisKey);

        // Now, update the username in MySQL
        const [updatedRowsCount] = await MahaDBT_Registration.update(
            { Mahadbt_Username: username },
            { where: { id: req.body.id } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Username updated successfully',
            data: { id: req.body.id, username }
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

        // Store updated password in Redis (you might want to store a hashed version of the password for security)
        const redisKey = `mahadbt_password:${req.body.id}`; // Unique key based on applicant ID
        const redisData = { id: req.body.id, password }; // Include ID and updated password
        await redisClient.set(redisKey, JSON.stringify(redisData));

        console.log("✅ Updated password in Redis:", redisKey);

        // Now, update the password in MySQL
        const [updatedRowsCount] = await MahaDBT_Registration.update(
            { mahadbt_password: password },
            { where: { id: req.body.id } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
            data: { id: req.body.id }
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

        // Store updated email in Redis
        const redisKey = `mahadbt_Applicant_Email:${req.body.id}`; // Unique key based on applicant ID
        const redisData = { id: req.body.id, email }; // Include ID and updated email
        await redisClient.set(redisKey, JSON.stringify(redisData));

        console.log("✅ Updated email in Redis:", redisKey);

        // Now, update the email in MySQL
        const [updatedRowsCount] = await MahaDBT_Registration.update(
            { mahadbt_Applicant_Email: email },
            { where: { id: req.body.id } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Email updated successfully',
            data: { id: req.body.id, email }
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

        // Store updated OTP in Redis
        const redisKey = `Email_OTP:${req.body.id}`; // Unique key based on applicant ID
        const redisData = { id: req.body.id, otp }; // Include ID and updated OTP
        await redisClient.set(redisKey, JSON.stringify(redisData));

        console.log("✅ Updated OTP in Redis:", redisKey);

        // Now, update the OTP in MySQL
        const [updatedRowsCount] = await MahaDBT_Registration.update(
            { Email_OTP: otp },
            { where: { id: req.body.id } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Email OTP updated successfully',
            data: { id: req.body.id, otp }
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

        // Store updated mobile number in Redis
        const redisKey = `mahadbt_Applicant_mobile:${req.body.id}`; // Unique key based on applicant ID
        const redisData = { id: req.body.id, mobile }; // Include ID and updated mobile number
        await redisClient.set(redisKey, JSON.stringify(redisData));

        console.log("✅ Updated mobile number in Redis:", redisKey);

        // Now, update the mobile number in MySQL
        const [updatedRowsCount] = await MahaDBT_Registration.update(
            { mahadbt_Applicant_mobile: mobile },
            { where: { id: req.body.id } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Mobile number updated successfully',
            data: { id: req.body.id, mobile }
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

        // Store updated OTP in Redis
        const redisKey = `Mobile_OTP:${req.body.id}`; // Unique key based on applicant ID
        const redisData = { id: req.body.id, otp }; // Include ID and updated OTP
        await redisClient.set(redisKey, JSON.stringify(redisData));

        console.log("✅ Updated OTP in Redis:", redisKey);

        // Now, update the OTP in MySQL
        const [updatedRowsCount] = await MahaDBT_Registration.update(
            { Mobile_OTP: otp },
            { where: { id: req.body.id } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Mobile OTP updated successfully',
            data: { id: req.body.id, otp }
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

        // Store updated Aadhaar number in Redis
        const redisKey = `Adhar_Number:${req.body.id}`; // Unique key based on applicant ID
        const redisData = { id: req.body.id, aadhaar }; // Include ID and updated Aadhaar number
        await redisClient.set(redisKey, JSON.stringify(redisData));

        console.log("✅ Updated Aadhaar number in Redis:", redisKey);

        // Now, update the Aadhaar number in MySQL
        const [updatedRowsCount] = await MahaDBT_Registration.update(
            { Adhar_Number: aadhaar },
            { where: { id: req.body.id } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Aadhaar number updated successfully',
            data: { id: req.body.id, aadhaar }
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

        // Store updated Aadhaar OTP in Redis
        const redisKey = `Adhar_OTP:${req.body.id}`; // Unique key based on applicant ID
        const redisData = { id: req.body.id, otp }; // Include ID and updated OTP
        await redisClient.set(redisKey, JSON.stringify(redisData));

        console.log("✅ Updated Aadhaar OTP in Redis:", redisKey);

        // Now, update the Aadhaar OTP in MySQL
        const [updatedRowsCount] = await MahaDBT_Registration.update(
            { Adhar_OTP: otp },
            { where: { id: req.body.id } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Applicant not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Aadhaar OTP updated successfully',
            data: { id: req.body.id, otp }
        });

    } catch (error) {
        console.error('Error updating Aadhaar OTP:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};


// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../database/connection");

// const MahaDBT_Registration = sequelize.define("MahaDBT_Registration", {
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     mahadbt_Applicant_Name: {
//         type: DataTypes.STRING(255),
//         allowNull: true
//     },
//     Mahadbt_Username: {
//         type: DataTypes.STRING(255),
//         allowNull: true
//     },
//     mahadbt_password: {
//         type: DataTypes.STRING(255),
//         allowNull: true
//     },
//     mahadbt_Applicant_Email: {
//         type: DataTypes.STRING(255),
//         allowNull: true
//     },
//     Email_OTP: {
//         type: DataTypes.STRING(6),
//         allowNull: true
//     },
//     mahadbt_Applicant_mobile: {
//         type: DataTypes.INTEGER,
//         allowNull: true
//     },
//     Mobile_OTP: {
//         type: DataTypes.STRING(6),
//         allowNull: true
//     },
//     Adhar_Number: {
//         type: DataTypes.STRING(12),
//         allowNull: true,
//         unique: true // Aadhaar number should be unique
//     },
//     Adhar_OTP: {
//         type: DataTypes.STRING(6),
//         allowNull: true
//     },
//     Registration_status: {
//         type: DataTypes.ENUM("pending", "completed", "failed"),
//         allowNull: true,
//         defaultValue: "pending"
//     },
//     created_at: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
//     },
//     updated_at: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
//     }
// }, {
//     timestamps: false, // Since we have custom timestamps
//     tableName: "MahaDBT_Registration" // Explicitly define table name
// });

// module.exports = MahaDBT_Registration;

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const MahaDBT_Registration = sequelize.define("MahaDBT_Registration", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    mahadbt_Applicant_Name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    Mahadbt_Username: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    mahadbt_password: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    mahadbt_Applicant_Email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    Email_OTP: {
        type: DataTypes.STRING(6),
        allowNull: true
    },
    mahadbt_Applicant_mobile: {
        type: DataTypes.STRING(15), // Changed to STRING for mobile numbers
        allowNull: true
    },
    Mobile_OTP: {
        type: DataTypes.STRING(6),
        allowNull: true
    },
    Adhar_Number: {
        type: DataTypes.STRING(12),
        allowNull: true,
        unique: true
    },
    Adhar_OTP: {
        type: DataTypes.STRING(6),
        allowNull: true
    },
    Registration_status: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
        allowNull: true,
        defaultValue: "pending"
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP")
    }
}, {
    timestamps: false, // Custom timestamps are defined
    tableName: "MahaDBT_Registration"
});

module.exports = MahaDBT_Registration;

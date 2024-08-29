//this model is used for Tranch Tracker College in GUI section

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const ForstuTranches = sequelize.define("forstu_tranches", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    Status: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Amount: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    ApplicationID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true // Assuming ApplicationID should be unique
    },
    Tranch: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    Credited_Date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Created: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    refID: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    timestamps: false, // Disable timestamps
    tableName: 'forstu_tranches' // Optional: Explicitly define the table name
});

module.exports = ForstuTranches;




// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../database/connection");

// const forstu_tranches = sequelize.define("forstu_tranches", {
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     Candidate_name: {
//         type: DataTypes.STRING(255),
//         allowNull: true
//     },
//     gender: {
//         type: DataTypes.STRING(10),
//         allowNull: true
//     },
//     dob: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     alternate_mobile_number: {
//         type: DataTypes.STRING(15),
//         allowNull: true
//     },
//     amount: {
//         type: DataTypes.STRING(15),
//         allowNull: true
//     },
//     tranch: {
//         type: DataTypes.STRING(15),
//         allowNull: true
//     },
//     whatsapp_number: {
//         type: DataTypes.STRING(15),
//         allowNull: true
//     },
//     Status: {
//         type: DataTypes.STRING(15),
//         allowNull: true
//     },
//      credited: {
//         type: DataTypes.STRING(15),
//         allowNull: true
//     },
//     Credit_Date: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     Bank_Txn_Date: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     updated: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     ApplicationID:{
//         type: DataTypes.STRING(50),
//         allowNull: true            
//     }
// }, {
//     timestamps: false // Disable timestamps
// });

// module.exports = forstu_tranches;

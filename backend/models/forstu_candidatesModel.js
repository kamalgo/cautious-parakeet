const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const ForstuCandidates = sequelize.define("forstu_candidates", {
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
    ApplicationID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true // Ensures ApplicationID is unique
    },
    WhatsappNumber: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Set default value to current timestamp
    },
    refID: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    amount_receivable: { // Add this field
        type: DataTypes.DECIMAL(10, 2), // Adjust the type and size as needed
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    timestamps: false, // Disable timestamps
    tableName: 'forstu_candidates' // Optional: Explicitly define the table name
});

module.exports = ForstuCandidates;

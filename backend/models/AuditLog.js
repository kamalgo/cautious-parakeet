const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const User = require("./usersModel"); // Import the User model

const AuditLog = sequelize.define("AuditLog", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference the User model
            key: "id",
        },
    },
    field_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    old_value: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    new_value: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "audit_logs",
    timestamps: false,
});

module.exports = AuditLog;

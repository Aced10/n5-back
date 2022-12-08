"use strict";
module.exports = (sequelize, Sequelize) => {
  const Permissions = sequelize.define(
    "Permissions",
    {
      permissionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      employeeLastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      employeeFirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      permissionType: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      permissionDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Permissions;
};

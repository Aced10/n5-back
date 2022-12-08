"use strict";

module.exports = (sequelize, Sequelize) => {
  const PermissionTypes = sequelize.define(
    "PermissionTypes",
    {
      permissionTypeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return PermissionTypes;
};

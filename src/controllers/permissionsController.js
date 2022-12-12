const db = require("../data-access/sequelize/models");
const Permission = db.permissions;
const PermissionType = db.permissionsType;

// Create and Save a new Permission
exports.create = (req, res) => {
  // Validate request

  if (
    !req.body.employeeLastName ||
    !req.body.employeeFirstName ||
    !req.body.permissionType ||
    !req.body.permissionDate
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Permissions
  const permissions = { ...req.body };

  // Save Permission in the database
  Permission.create(permissions)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Permission.",
      });
    });
};

// Retrieve all Permissions from the database.
exports.findAll = async (req, res) => {
  db.sequelize
    .query(
      "SELECT * FROM Permissions JOIN PermissionTypes ON Permissions.PermissionType = PermissionTypes.PermissionTypeID"
    )
    .then((results, metadata) => {
      res.send(results[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

// Find a single Permission with an id
exports.findOne = (req, res) => {
  const permissionID = req.params.id;

  Permission.findByPk(permissionID)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Permission with id=${permissionID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Permission with id=${permissionID}.`,
      });
    });
};

// Update a Permission by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Permission.update(req.body, {
    where: { PermissionID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Permission was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Permission with id=${id}. Maybe Permission was not found or id is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Permission with id= ${id}`,
      });
    });
};

// Delete a Permission by the id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Permission.destroy({
    where: { PermissionID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Permission was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot deleted Permission with id=${id}. Maybe Permission was not found or id is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleted Permission with id= ${id}`,
      });
    });
};

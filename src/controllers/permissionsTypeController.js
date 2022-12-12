const db = require("../data-access/sequelize/models");
const PermissionType = db.permissionsType;

// Create and Save a new Permission Type
exports.create = (req, res) => {
  // Validate request

  if (!req.body.description) {
    res.status(400).send({
      message: "Description can not be empty!",
    });
    return;
  }

  // Create a Permission Type
  const permissionType = { ...req.body };

  // Save Permission Type in the database
  PermissionType.create(permissionType)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Permission Type.",
      });
    });
};

// Retrieve all Permission Types from the database.
exports.findAll = (req, res) => {
  PermissionType.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

// Delete a Permission type by the id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PermissionType.destroy({
    where: { permissionTypeID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Permission type was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot deleted Permission type with id=${id}. Maybe Permission was not found or id is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleted Permission type with id= ${id}`,
      });
    });
};

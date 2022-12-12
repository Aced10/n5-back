const router = require("express").Router();
const permissionsController = require("../controllers/permissionsController.js");

// Create a new permission
router.post("/", permissionsController.create);

// Retrieve all permission
router.get("/", permissionsController.findAll);

// Retrieve a single permission with id
router.get("/:id", permissionsController.findOne);

// Update a permission with id
router.put("/:id", permissionsController.update);

// Delete a permission by id
router.delete("/:id", permissionsController.delete);

module.exports = router;

const router = require("express").Router();
const permissionsTypeController = require("../controllers/permissionsTypeController.js");

// Create a new permission type
router.post("/", permissionsTypeController.create);

// Retrieve all permission types
router.get("/", permissionsTypeController.findAll);

// Delete permission type by id
router.delete("/:id", permissionsTypeController.delete);

module.exports = router;

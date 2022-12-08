const router = require("express").Router();
const permissionsController = require("../controllers/permissionsController.js");

// Create a new Permission
router.post("/", permissionsController.create);

// Retrieve all Permission
router.get("/", permissionsController.findAll);

// Retrieve a single Permission with id
router.get("/:id", permissionsController.findOne);

// Update a Permission with id
router.put("/:id", permissionsController.update);

module.exports = router;

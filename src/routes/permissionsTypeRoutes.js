const router = require("express").Router();
const permissionsTypeController = require("../controllers/permissionsTypeController.js");

// Create a new Permission Type
router.post("/", permissionsTypeController.create);

// Retrieve all Permission Types
router.get("/", permissionsTypeController.findAll);

module.exports = router;

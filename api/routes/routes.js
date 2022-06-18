const jwt = require("../middlewares/jwtVerify");
const express = require("express")
const router = express.Router();
const contactController = require("../controllers/contactController");
const userController = require("../controllers/userController");

// Register
router.post("/user", userController.register);

// Login
router.post("/login", userController.login);

// Send email to recover password
router.post("/recoveryPassword", userController.recoveryPassword);

// Update user password
router.patch("/user", userController.update);

// Create new contact
router.post("/contacts", jwt, contactController.newContact);

// Get all contacts for a user
router.get("/contacts", jwt, contactController.getContacts);

// Get contact for user
router.get("/contacts/:_id", jwt, contactController.getContact);

// Delete contact for a user
router.delete("/contacts/:_id", jwt, contactController.deleteContact);

// Update contact for a user
router.patch("/contacts", jwt, contactController.updateContact);

// Handle not existing routes
router.all('*', function (req, res) {
    return res
        .status(404)
        .json({error: "404 Not found"});
})

module.exports = router;

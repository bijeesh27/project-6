const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.get("/", adminController.loadLogin);

router.post("/login", adminController.admin);

router.post("/dashboard", adminController.loadDashboard);

router.get("/dashboard", adminController.loadDashboard);

router.post("/addUser", adminController.addUser);

router.post("/editUser/:id", adminController.editUser);

router.get("/deleteUser/:id", adminController.deleteUser);

router.get("/logout", adminController.logout);

module.exports = router;

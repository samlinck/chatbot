const express = require('express');
const router = express.Router();
const messagesController = require("../../../controllers/api/v1/messages");

router.get("/", messagesController.getAll);

router.post("/", messagesController.create);

module.exports = router;

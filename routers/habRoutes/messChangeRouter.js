const express = require("express");
const {
  messResponseChange,
} = require("../../controllers/habControllers/messChangeController");
const {
  verifyUserRequest,
  restrictIfGuest,
} = require("../../middlewares/user.auth");
const messChangeRouter = express.Router();

messChangeRouter.post(
  "/mess/messChange",
  verifyUserRequest,
   restrictIfGuest,
  messResponseChange
);

module.exports = { messChangeRouter };
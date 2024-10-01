const {Mess} = require("../../models/habModels/messModel");

const verifyRoles = require("../utils");
const roles = require("../roles");

let allowedRoles = [roles.SUPERADMIN,roles.ONESTOPUSER];

module.exports = {
    resource : Mess,
}

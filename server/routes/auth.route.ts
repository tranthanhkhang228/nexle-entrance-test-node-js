import {} from "@controllers";
import * as express from "express";

const router = express.Router();

const { postLogin, postRegister } = require("../controllers/auth_controller");

router.route("/login").post(postLogin);

router.route("/register").post(postRegister);

module.exports = router;

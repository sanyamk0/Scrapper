const express = require("express");
const { scrapper } = require("../controller/controller");

const router = express.Router();
router.get("/", scrapper);

exports.router = router;

const express = require("express");
const router = express.Router();

const { summarize, paragraph, chatbot, jsConverter, scifi, buildtest } = require("../controllers/openai");

router.route("/summary").post(summarize);
router.route("/testbuilder").post(buildtest);
router.route("/paragraph").post(paragraph);
router.route("/chatbot").post(chatbot);
router.route("/js-convert").post(jsConverter);
router.route("/scifi-img").post(scifi);

module.exports = router;

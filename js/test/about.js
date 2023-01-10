const express = require("express");
const router = express.Router();

router.get("/hi", (req, res) => {
    res.send("Hello hi!");
});

module.exports = router;

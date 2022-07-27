var express = require("express");
var router = express.Router();
const { sendNotfications } = require("../extras/helperMethods");

// POST /api/notifications/sendnotifications
router.post("/sendnotifications", async function (req, res) {
    try {
        const { emails, message } = req.body;
        const data = await sendNotfications(emails, message);
        res.send(data).status(200);
    } catch (e) {
        console.error(e);
        res.send(e).status(400);
    }
});

module.exports = router;

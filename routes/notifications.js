const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();

// POST /api/notifications/sendnotifications
router.post("/sendnotifications", async function (req, res) {
    const { emails, message } = req.body;
    const data = { emails, message };
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.post(
        "https://prod-19.southeastasia.logic.azure.com:443/workflows/803a09579ae4443795c06aee661a367f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CZ_Ph_BVKaL-HxGuw82aY5toOeTF3WGveBu4LBlCbsU",
        data,
        config
    );
    res.send(response.data);
});

module.exports = router;

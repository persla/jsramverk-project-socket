var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    const data = {
        description: "Jag heter Lars Persson och läser webbprogrammering på BTH."
        + "Jag studerar på distans från Umeå och det ska bli intressant"
        + "att lära sig mer om jsramverk.",
    };

    res.json(data);
});

module.exports = router;

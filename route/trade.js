const express = require('express');
const router = express.Router();

const trade = require("../models/trade.js");

router.get('/', (req, res) => trade.getReports(res, req));
router.get('/:id', (req, res) => trade.getRecords(res, req.params.id));
router.post('/', (req, res) => trade.addRecord(res, req.body));
router.put('/', (req, res) => trade.updateReport(res, req.body));
// router.delete('/', (req, res) => reports.deleteReport(res, req.body));


module.exports = router;

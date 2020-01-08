const express = require('express');
const path = require("path");
const router = express.Router();

const authModel = require("./models/auth.js");
// const me = require('./route/me.js');
const auth = require("./route/auth.js");
const register = require("./route/register.js");
const login = require("./route/login.js");
const reports = require("./route/reports.js");
const trade = require("./route/trade.js");
// const copier = require("./route/copier.js");
// const deliveries = require("./route/deliveries.js");
// const invoices = require("./route/invoices.js");
// const orderItems = require("./route/order_items.js");
// const orders = require("./route/orders.js");
// const products = require("./route/products.js");

// router.all('*', authModel.checkAPIKey);

router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/documentation.html')));

// router.use("/me", me);
router.use("/auth", auth);
router.use("/register", register);
router.use("/login", login);
// router.use("/reports", reports);
router.use("/reports", trade);

// router.use("/copier", copier);
// router.use("/deliveries", deliveries);
// router.use("/invoices", invoices);
// router.use("/order_items", orderItems);
// router.use("/orders", orders);
// router.use("/products", products);

module.exports = router;

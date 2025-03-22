const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");


router.post("/transactions/transfer", transactionController.transferMoney);


router.post("/transactions/buy", transactionController.buyCrypto);


router.post("/transactions/sell", transactionController.sellCrypto);

module.exports = router;

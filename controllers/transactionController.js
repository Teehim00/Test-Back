const transactionModel = require("../models/transactionModel");

const transferMoney = async (req, res) => {
  const { fromUserId, toUserId, cryptoId, amount } = req.body;
  try {
    const transaction = await transactionModel.transferMoney(
      fromUserId,
      toUserId,
      cryptoId,
      amount
    );
    return res
      .status(201)
      .json({ message: "Money transferred successfully", transaction });
  } catch (error) {
    console.error("Error transferring money:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const buyCrypto = async (req, res) => {
  const { userId, cryptoId, amount, price } = req.body;
  try {
    const transaction = await transactionModel.buyCrypto(
      userId,
      cryptoId,
      amount,
      price
    );
    return res
      .status(201)
      .json({ message: "Crypto bought successfully", transaction });
  } catch (error) {
    console.error("Error buying crypto:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const sellCrypto = async (req, res) => {
  const { userId, cryptoId, amount, price } = req.body;
  try {
    const transaction = await transactionModel.sellCrypto(
      userId,
      cryptoId,
      amount,
      price
    );
    return res
      .status(201)
      .json({ message: "Crypto sold successfully", transaction });
  } catch (error) {
    console.error("Error selling crypto:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  transferMoney,
  buyCrypto,
  sellCrypto,
  
};

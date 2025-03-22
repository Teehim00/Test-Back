const userModel = require("../models/userModel");

const getUserController = async (req, res) => {
  const { userId } = req.params;

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const userData = await userModel.getUsers(userId);
    if (userData.length === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${userId} has no transactions` });
    }
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user with transactions:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getUserWithWalletsController = async (req, res) => {
  const { userId } = req.params;

  try {
    const userData = await userModel.getUserWithWallets(userId);

    if (userData.length === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${userId} not found` });
    }

    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user with wallets:", error.message); // log ข้อผิดพลาด
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getUserWithTransactionsController = async (req, res) => {
  const { userId } = req.params;
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const userData = await userModel.getUserWithTransactions(userId);ล
    if (userData.length === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${userId} has no transactions` });
    }
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user with transactions:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const createUserController = async (req, res) => {
  const { name, email, password, balance_thb, balance_usd } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newUser = await userModel.createUser({
      name,
      email,
      password,
      balance_thb,
      balance_usd,
    });
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserController = async (req, res) => {
  const { userId } = req.params; 
  const { newName, newEmail, newBalance } = req.body; 

  try {
    const result = await userModel.updateUser(
      userId,
      newName,
      newEmail,
      newBalance
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in updating user controller:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteUserController = async (req, res) => {
  const { userId } = req.params; 

  try {
    const result = await userModel.deleteUser(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in deleting user controller:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getUserController,
  getUserWithWalletsController,
  getUserWithTransactionsController,
  createUserController,
  updateUserController,
  deleteUserController,
};

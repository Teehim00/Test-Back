const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users/:userId", userController.getUserController);

router.get(
  "/users/:userId/wallets",
  userController.getUserWithWalletsController
);

router.get(
  "/users/:userId/tran",
  userController.getUserWithTransactionsController
);

router.post("/users", userController.createUserController);

router.put("/users/:userId", userController.updateUserController);
router.delete("/users/:userId", userController.deleteUserController);

module.exports = router;

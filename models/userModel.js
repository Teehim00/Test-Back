const pool = require("./db");

const getUsers = async (userId) => {
  try {
    const result = await pool.query(
      `
    SELECT u.user_id, u.name, u.email 
      FROM "users" u
      WHERE u.user_id = $1;
        `,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return result.rows;
  } catch (error) {
    console.error("Error fetching user with wallets:", error.message);
    throw error; 
  }
};


const getUserWithWallets = async (userId) => {
  try {
    const result = await pool.query(
      `
        SELECT u.user_id, u.name, u.email, w.wallet_id, c.name AS crypto_name, c.symbol AS crypto_symbol, w.balance
        FROM "users" u
        LEFT JOIN "wallet" w ON u.user_id = w.user_id
        LEFT JOIN "cryptocurrency" c ON w.crypto_id = c.crypto_id
        WHERE u.user_id = $1;
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return result.rows;
  } catch (error) {
    console.error("Error fetching user with wallets:", error.message);
    throw error; 
  }
};


const getUserWithTransactions = async (userId) => {
  try {
    const result = await pool.query(
      `
        SELECT u.user_id, u.name, u.email, t.transaction_id, t.from_user_id, t.to_user_id, t.crypto_id, t.amount, t.transaction_type, t.transaction_status, t.transaction_date
        FROM "users" u
        LEFT JOIN "transaction" t ON (u.user_id = t.from_user_id OR u.user_id = t.to_user_id)
        WHERE u.user_id = $1;
        `,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error(`User with ID ${userId} has no transactions`);
    }

    return result.rows;
  } catch (error) {
    console.error("Error fetching user with transactions:", error.message);
    throw error;
  }
};


const createUser = async ({
  name,
  email,
  password,
  balance_thb,
  balance_usd,
}) => {
  try {
    const result = await pool.query(
      `INSERT INTO "users" (name, email, password, balance_thb, balance_usd)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING user_id, name, email, balance_thb, balance_usd`,
      [name, email, password, balance_thb, balance_usd]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};


const updateUser = async (userId, newName, newEmail, newBalance) => {
  try {
    const checkUser = await pool.query(
      `
       SELECT * FROM "users" WHERE user_id = $1;
        `,
      [userId]
    );

    if (checkUser.rows.length === 0) {
      throw new Error("User not found");
    }


    const updateResult = await pool.query(
      `
        UPDATE "users"
        SET name = $1, email = $2, balance_thb = $3, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $4;
        `,
      [newName, newEmail, newBalance, userId]
    );

    return { message: "User updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};


const deleteUser = async (userId) => {
  try {
    const checkUser = await pool.query(
      `SELECT * FROM "users" WHERE user_id = $1;`,
      [userId]
    );

    if (checkUser.rows.length === 0) {
      throw new Error("User not found");
    }
    const deleteResult = await pool.query(
      `DELETE FROM "users" WHERE user_id = $1;`,
      [userId]
    );

    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};

module.exports = {
  getUsers,
  getUserWithWallets,
  getUserWithTransactions,
  createUser,
  updateUser,
  deleteUser,
};

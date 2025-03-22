const pool = require("./db"); 

const transferMoney = async (fromUserId, toUserId, cryptoId, amount) => {
  try {
    const result = await pool.query(
      `INSERT INTO "transaction" (from_user_id, to_user_id, crypto_id, amount, transaction_type, transaction_status)
       VALUES ($1, $2, $3, $4, 'TRANSFER', 'PENDING') RETURNING *;`,
      [fromUserId, toUserId, cryptoId, amount]
    );
    return result.rows[0]; 
  } catch (error) {
    console.error("Error transferring money:", error.message);
    throw error;
  }
};


const buyCrypto = async (userId, cryptoId, amount, price) => {
  try {
    const result = await pool.query(
      `INSERT INTO "transaction" (from_user_id, crypto_id, amount, transaction_type, transaction_status)
       VALUES ($1, $2, $3, 'BUY', 'PENDING') RETURNING *;`,
      [userId, cryptoId, amount]
    );
    return result.rows[0]; 
  } catch (error) {
    console.error("Error buying crypto:", error.message);
    throw error;
  }
};


const sellCrypto = async (userId, cryptoId, amount, price) => {
  try {
    const result = await pool.query(
      `INSERT INTO "transaction" (from_user_id, crypto_id, amount, transaction_type, transaction_status)
       VALUES ($1, $2, $3, 'SELL', 'PENDING') RETURNING *;`,
      [userId, cryptoId, amount]
    );
    return result.rows[0]; 
  } catch (error) {
    console.error("Error selling crypto:", error.message);
    throw error;
  }
};

module.exports = {
  transferMoney,
  buyCrypto,
  sellCrypto,
};

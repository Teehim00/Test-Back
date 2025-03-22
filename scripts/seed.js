const pool = require("../models/db");

const seedUsers = async () => {
  try {
    await pool.query(`
      INSERT INTO "users" (name, email, password, balance_thb, balance_usd)
      VALUES
        ('John Doe', 'john@example.com', 'password123', 1000.00, 500.00),
        ('Jane Doe', 'jane@example.com', 'password456', 1500.00, 600.00);
    `);
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

const seedCryptocurrencies = async () => {
  try {
    await pool.query(`
      INSERT INTO "cryptocurrency" (name, symbol, price_in_usd)
      VALUES
        ('Bitcoin', 'BTC', 45000.00),
        ('Ethereum', 'ETH', 3000.00),
        ('XRP', 'XRP', 1.00),
        ('Dogecoin', 'DOGE', 0.50);
    `);
    console.log("Cryptocurrencies seeded successfully");
  } catch (error) {
    console.error("Error seeding cryptocurrencies:", error);
  }
};

const seedWallets = async () => {
  try {
    await pool.query(`
      INSERT INTO "wallet" (user_id, crypto_id, balance)
      VALUES
        (1, 1, 0.5),  -- User 1 holding 0.5 BTC
        (1, 2, 2.0),  -- User 1 holding 2.0 ETH
        (2, 1, 1.0),  -- User 2 holding 1.0 BTC
        (2, 3, 1000); -- User 2 holding 1000 XRP
    `);
    console.log("Wallets seeded successfully");
  } catch (error) {
    console.error("Error seeding wallets:", error);
  }
};

const seedTransactions = async () => {
  try {
    await pool.query(`
      INSERT INTO "transaction" (from_user_id, to_user_id, crypto_id, amount, transaction_type, transaction_status)
      VALUES
        (1, 2, 1, 0.1, 'transfer', 'completed'),
        (2, 1, 2, 0.5, 'buy', 'completed');
    `);
    console.log("Transactions seeded successfully");
  } catch (error) {
    console.error("Error seeding transactions:", error);
  }
};

const seedPayments = async () => {
  try {
    await pool.query(`
      INSERT INTO "payment" (user_id, amount, payment_method, status)
      VALUES
        (1, 500.00, 'fiat', 'completed'),
        (2, 2000.00, 'crypto', 'pending');
    `);
    console.log("Payments seeded successfully");
  } catch (error) {
    console.error("Error seeding payments:", error);
  }
};

const seedData = async () => {
  await seedUsers();
  await seedCryptocurrencies();
  await seedWallets();
  await seedTransactions();
  await seedPayments();
};

seedData();

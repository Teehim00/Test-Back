
# Cryptocurrency API

## ขั้นตอนการตั้งค่าและรันโปรเจค

### 1. Clone โปรเจค
```bash
git clone <repository-url>
cd <project-directory>

### 2. Install Dependencies
npm install

### 3. CREATE TABLE
File in folder CREATE TABLE

### 4. Set Up Environment Variables
Create a file .env.local

### 4. Run seed Inseart data
node scripts/seed.js

### 5. Run server
node server.js


Test Postman

GET /users/:userId 
http://localhost:3000/api/users/1

GET /users/:userId/wallets
http://localhost:3000/api/users/1/wallets

GET /users/:userId/tran
http://localhost:3000/api/users/1/tran

POST /users
http://localhost:3000/api/users
{
  "name": "Tee Him",
  "email": "tee.him@example.com",
  "password": "password123",
  "balance_thb": 10000,
  "balance_usd": 300
}

PUT /users/:userId
http://localhost:3000/api/users/4
{
  "newName": "New User Name",
  "newEmail": "new.email@example.com",
  "newBalance": 6000
}

DELETE /users/:userId
http://localhost:3000/api/users/4


POST /transactions/transfer
http://localhost:3000/api/transactions/transfer
{
  "fromUserId": 1,
  "toUserId": 2,
  "cryptoId": 1,
  "amount": 100
}


POST /transactions/buy
http://localhost:3000/api/transactions/buy
{
  "userId": 1,
  "cryptoId": 1,
  "amount": 50,
  "price": 2000
}

POST /transactions/sell
http://localhost:3000/api/transactions/sell
{
  "userId": 1,
  "cryptoId": 1,
  "amount": 50,
  "price": 2000
}
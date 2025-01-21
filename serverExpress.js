import express from 'express';
import dotenv from 'dotenv'; // import dotenv package

// Load environment variables in .env file
dotenv.config();

const app = express();
const port = 3000;

// Use .env variables
const gmailPassword = process.env.GMAIL_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

console.log('Gmail Password: ', gmailPassword);
console.log('Database Configuration:');
console.log(`Host: ${dbHost}`);
console.log(`Port: ${dbPort}`);
console.log(`User: ${dbUser}`);
console.log(`Password: ${dbPassword}`);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
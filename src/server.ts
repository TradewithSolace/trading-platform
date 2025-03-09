import express, { Request, Response } from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN || ''; // Store this in a .env file
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Change this to a secure key

// Endpoint to handle Telegram login
app.post('/telegram-login', (req: Request, res: Response) => {
    const data = req.body;  // Telegram login data
    const { hash, auth_date, id, username, first_name } = data;

    // Verify login data (basic security check)
    const hashCheckString = `auth_date=${auth_date}\nid=${id}\nusername=${username}`;
    const secretHash = crypto.createHmac('sha256', SECRET_KEY).update(hashCheckString).digest('hex');

    if (secretHash !== hash) {
        return res.status(400).json({ error: 'Invalid authentication data' });
    }

    // Simulate checking if the user exists in a database
    const isNewUser = checkIfNewUser(username);
    
    if (isNewUser) {
        const wallet = generateWallet();
        storeUserData(username, wallet);
        return res.json({ message: 'Welcome! Your wallet has been created.', walletAddress: wallet.address });
    }

    return res.json({ message: 'Welcome back!', walletAddress: getUserWallet(username) });
});

// Simulated user database
const userDatabase: Record<string, { address: string; privateKey: string }> = {};

// Function to check if user is new
function checkIfNewUser(username: string): boolean {
    return !userDatabase[username];
}

// Function to generate a new wallet (replace with real wallet generation)
function generateWallet(): { address: string; privateKey: string } {
    return {
        address: `0x${crypto.randomBytes(20).toString('hex')}`,
        privateKey: `0x${crypto.randomBytes(32).toString('hex')}`
    };
}

// Store user data
function storeUserData(username: string, wallet: { address: string; privateKey: string }) {
    userDatabase[username] = wallet;
    console.log(`Stored data for ${username}: Wallet Address - ${wallet.address}`);
}

// Get user wallet
function getUserWallet(username: string): string {
    return userDatabase[username]?.address || 'Wallet not found';
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

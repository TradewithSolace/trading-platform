const { Connection, PublicKey } = require('@solana/web3.js');


const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";


const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

const walletAddress = "DzCGP3ehbg38BUo5u6pZLfLtae7FsgAq8Embib9PjWKr";  


async function getBalance() {
    try {
        console.log("Connecting to Solana network...");
        
        // Create a PublicKey object from the wallet address
        const publicKey = new PublicKey(walletAddress);
        console.log(`Fetching balance for wallet: ${walletAddress}`);
        
        // Get the balance of the public key in SOL
        const balance = await connection.getBalance(publicKey);

        // Output the balance in SOL (convert from lamports)
        console.log(`Balance for wallet ${walletAddress}: ${balance / 10 ** 9} SOL`);  // balance is in lamports (1 SOL = 10^9 lamports)
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
}

getBalance();

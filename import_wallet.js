const web3 = require('@solana/web3.js');
const fs = require('fs');

async function importWallet() {
    try {
        // Read private key from file
        let keyData = fs.readFileSync("wallet.json", "utf8").trim();

        let keypair;
        
        if (keyData.startsWith("[") && keyData.endsWith("]")) {
            // If it's a JSON array (Uint8Array format)
            const secretKey = JSON.parse(keyData);
            keypair = web3.Keypair.fromSecretKey(new Uint8Array(secretKey));
        } else {
            // If it's a Base58-encoded private key (Phantom format)
            keypair = web3.Keypair.fromSecretKey(web3.Keypair.fromSecretKey(web3.utils.bytes.bs58.decode(keyData)).secretKey);
        }

        console.log("Wallet Address:", keypair.publicKey.toBase58());

        // Connect to Solana
        const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

        // Get wallet balance
        const balance = await connection.getBalance(keypair.publicKey);
        console.log("Wallet Balance:", balance / web3.LAMPORTS_PER_SOL, "SOL");
    } catch (error) {
        console.error("Error importing wallet:", error);
    }
}

importWallet();

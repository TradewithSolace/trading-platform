const web3 = require('@solana/web3.js');
const fs = require('fs');

const filePath = "wallet.json";

if (fs.existsSync(filePath)) {
    console.log("A wallet already exists. If you want a new one, delete wallet.json first.");
} else {
    const keypair = web3.Keypair.generate();
    console.log("Wallet Address:", keypair.publicKey.toBase58());

    fs.writeFileSync(filePath, JSON.stringify(Array.from(keypair.secretKey)));
    console.log("Private key saved to wallet.json");
}

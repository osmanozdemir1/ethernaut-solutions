const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0xf6deAE0590Fd4528049014D1b39c43EDd83878c1";

async function main() {
    const coinFlipAttack = await ethers.getContractAt("CoinFlipAttack", ATTACKER_ADDRESS);

    const tx = await coinFlipAttack.attack();
    const txReceipt = await tx.wait();
    console.log(txReceipt);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
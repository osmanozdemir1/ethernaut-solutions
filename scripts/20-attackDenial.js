// For this challenge only deploying the contract is enough. We don't need to attack at all.
// This is deployment script.

const hre = require("hardhat");

const INSTANCE_ADDRESS = "0x734Db8945f56D993ab23272c23C87634611A7e5D";

async function main() {
  const DenialAttack = await hre.ethers.getContractFactory("DenialAttack");
  const denialAttack = await DenialAttack.deploy(INSTANCE_ADDRESS);
  await denialAttack.deployed();

  console.log(
    `DenialAttack deployed to ${denialAttack.address}`
  );
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

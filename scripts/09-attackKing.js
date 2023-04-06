const hre = require("hardhat");

const INSTANCE_ADDRESS = "0x2d5A551e5E923B6A8C24bDc0F6792c59F86e87f8"

// We don't need to call a function or do something else.
// Only deploying the KingAttack contract with constructor values is enough for this challenge.

async function main() {  
  const KingAttack = await hre.ethers.getContractFactory("KingAttack");
  const kingAttacker = await KingAttack.deploy(INSTANCE_ADDRESS, {value: 1000000000000000});
  await kingAttacker.deployed();

  console.log(
    `KingAttack deployed to ${kingAttacker.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
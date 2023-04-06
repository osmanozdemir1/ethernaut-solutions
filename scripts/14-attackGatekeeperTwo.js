const hre = require("hardhat");

const INSTANCE_ADDRESS = "0x27cF92E08202Fbd61F9BBA3F9Fae31cC8F9aA335";

async function main() {
  const GatekeeperTwoAttack = await hre.ethers.getContractFactory("GatekeeperTwoAttack");
  const gatekeeperTwoAttack = await GatekeeperTwoAttack.deploy(INSTANCE_ADDRESS);
  await gatekeeperTwoAttack.deployed();

  console.log(
    `GatekeeperTwoAttack deployed to ${gatekeeperTwoAttack.address}`
  );
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
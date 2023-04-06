const { ethers } = require("hardhat");
const hre = require("hardhat");

const INSTANCE_ADDRESS = "0x4b5B472a36722D2a5d4CE866FA97293a0053297d";
const amount = ethers.utils.parseEther("0.003")

async function main() {
  const GatekeeperThreeAttack = await hre.ethers.getContractFactory("GatekeeperThreeAttack");
  const gatekeeperThreeAttack = await GatekeeperThreeAttack.deploy(INSTANCE_ADDRESS, {value: amount});
  await gatekeeperThreeAttack.deployed();

  console.log(
    `GatekeeperThreeAttack deployed to ${gatekeeperThreeAttack.address}`
  );
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

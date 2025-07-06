const hre = require("hardhat");

async function main() {
  const HumanProof = await hre.ethers.getContractFactory("HumanProof");
  const contract = await HumanProof.deploy();
  await contract.deployed();
  console.log(`✅ Contract deployed to: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

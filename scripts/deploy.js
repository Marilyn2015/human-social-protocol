js
const { ethers } = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("HumanProof");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log(`✅ Contract deployed to: ${contract.address}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
